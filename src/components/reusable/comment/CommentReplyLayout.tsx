import { Avatar, Group, createStyles, Text, Stack, TypographyStylesProvider, ActionIcon, Tooltip, Badge, Code } from '@mantine/core';
import { MdWavingHand, MdReply, MdReport } from "react-icons/md";
import { FaGift } from 'react-icons/fa';
import { CommentDataParam, TreeCommentDataParam } from '@interfaces/comment';
import { CreateReply } from './CreateReply';
import { useEffect, useState } from 'react';
import { doubleDigit, parseErrors, pinComment, unpinComment, voteComment } from 'src/helpers';
import { useNotifications } from '@mantine/notifications';
import { Check, Pin, Pinned, X } from 'tabler-icons-react';
import { useQueryClient } from 'react-query';
import { Reply } from './Reply';
import { PostDataParam } from '@interfaces/post';
import { CommentReplyCount } from './layers/CommentReplyCount';
import { CommentMenus } from './layers/CommentMenus';
import { CommentContentUpdateModal } from './layers/CommentContentUpdateModal';
import { CommentDeleteModal } from './layers/CommentDeleteModal';

const useStyles = createStyles((theme, _params, getRef) => ({
    cwrapper: {
        position: 'relative',
        [`&:hover .comment-menus`]: {
            display: 'flex'
        },
    },
    rwrapper: {
        position: 'relative',
        [`&:hover .reply-menus`]: {
            display: 'flex'
        },
    },
    avatar: {
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[3],
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[4],
    },
    typography: {
        fontSize: theme.fontSizes.sm,
    },
    replies: {
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[4],
    },
    createReply: {
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderColor: theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[4],
        backgroundColor: theme.colors.dark[7],
    },
    badge: {
        display: "flex",
        alignItems: "center"
    },
    flex: {
        display: "flex"
    },
    pinned: {
        // backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25),
        // padding: theme.spacing.sm,
        // borderRadius: theme.radius.xs
    },
    clapButton: {
        width: 45,
        paddingLeft: 3,
        paddingRight: 3
    }
}));

export interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: CommentDataParam[];
    }
}

export interface PDataParam {
    data: PostDataParam
}

export function CommentReplyLayout({ layout, data, postId, commentsCount, is_admin, is_moderator, pinned_comment }: { layout: 'comment' | 'reply', data: TreeCommentDataParam, postId: number, commentsCount: number, is_admin: boolean, is_moderator: boolean, pinned_comment?: number }) {
    const { classes, cx } = useStyles();
    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const [showReplyEditor, setShowReplyEditor] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pinned, setPinned] = useState(false)

    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    useEffect(() => {
        if (data.id === pinned_comment) {
            setPinned(true)
        } else {
            setPinned(false)
        }
    }, [pinned_comment, data])


    const clapComment = () => {
        setLoading(true)
        voteComment(data.id).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error clapping the comment!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                const oldData: any = queryClient.getQueryData<DataParam>(['comments', postId.toString()])
                const newData = oldData
                const commentIndex = newData.data.results.findIndex((e: { id: number }) => e.id === data.id)
                newData.data.results[commentIndex].num_vote_up = res.data.count
                queryClient.setQueryData(['comments', postId.toString()], { ...newData })
            }
        })
    }

    const markPin = () => {
        setLoading(true)
        pinComment(data.id).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error pinning the comment!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                notifications.showNotification({
                    title: "Comment pinned",
                    message: "Selected comment has been unpinned",
                    color: "teal",
                    icon: <Check size={18} />,
                    autoClose: 5000,
                });
                setLoading(false)
                const oldData: any = queryClient.getQueryData<PDataParam>(['post_details', postId.toString()])
                const newData = oldData
                newData.data.pinned_comment = res.data.pinned_comment
                queryClient.setQueryData(['post_details', postId.toString()], { ...newData })
            }
        })
    }

    const unmarkPin = () => {
        setLoading(true)
        unpinComment(data.id).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error pinning the comment!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                notifications.showNotification({
                    title: "Comment unpinned",
                    message: "Selected comment has been unpinned.",
                    color: "teal",
                    icon: <Check size={18} />,
                    autoClose: 5000,
                });
                setLoading(false)
                const oldData: any = queryClient.getQueryData<PDataParam>(['post_details', postId.toString()])
                const newData = oldData
                newData.data.pinned_comment = res.data.pinned_comment
                queryClient.setQueryData(['post_details', postId.toString()], { ...newData })
            }
        })
    }

    return (
        <>
            <Stack spacing={8} className={cx({ [classes.cwrapper]: layout === 'comment' }, { [classes.rwrapper]: layout === 'reply' }, { [classes.pinned]: pinned })}>
                {pinned && (
                    <div className={classes.flex}>
                        <Badge className={classes.badge} radius="xs" leftSection={<Pinned style={{ display: "flex" }} size={14} />}>Pinned Comment</Badge>
                    </div>
                )}
                <Group spacing="xs">
                    <Avatar
                        size={20}
                        src={data.author.avatar}
                        radius={20}
                        className={classes.avatar}
                    />
                    <Text size="sm" weight={600} color="yellow">{`${data.author.first_name} ${data.author.last_name}`}</Text>
                    <Text size="sm" weight={600} color="dimmed">2 hours ago</Text>
                    <CommentMenus setEditorModal={setEditModal} setDeleteModal={setDeleteModal} is_admin={is_admin} is_moderator={is_moderator} author_username={data.author.username} />
                </Group>

                {data.is_active ? (
                    <TypographyStylesProvider className={classes.typography}>
                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    </TypographyStylesProvider>
                ) : (
                    <Code style={{width: "fit-content"}}>{data.content}</Code>
                )}

                <Group>
                    {layout === "comment" && <CommentReplyCount commentsCount={commentsCount} color="red" />}
                    <Group spacing="xs" className={cx({ ['comment-menus']: layout === 'comment' }, { ['reply-menus']: layout === 'reply' })}>
                        <Tooltip label="Clap" position="top">
                            <ActionIcon className={classes.clapButton} variant="filled" size="xs" loading={loading} onClick={() => clapComment()}>
                                <MdWavingHand size={14} className="wave" />
                                <Text ml="auto" size='xs' weight={600}>{doubleDigit(data.num_vote_up)}</Text>
                            </ActionIcon>
                        </Tooltip>
                        {layout === "comment" && (
                            <Tooltip label="Whisper" position="top">
                                <ActionIcon variant="filled" size="xs" onClick={() => setShowReplyEditor(true)}>
                                    <MdReply size={14} />
                                </ActionIcon>
                            </Tooltip>
                        )}
                        {layout === "comment" && (is_admin || is_moderator) && (
                            <>
                                {pinned ? (
                                    <Tooltip label="Unpin comment" position="top">
                                        <ActionIcon variant="filled" size="xs" loading={loading} onClick={() => unmarkPin()}>
                                            <Pinned size={14} />
                                        </ActionIcon>
                                    </Tooltip>
                                ) : (
                                    <Tooltip label="Pin comment" position="top">
                                        <ActionIcon variant="filled" size="xs" loading={loading} onClick={() => markPin()}>
                                            <Pin size={14} />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </>
                        )}
                        <Tooltip label="Give Award" position="top">
                            <ActionIcon variant="filled" size="xs">
                                <FaGift size={14} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Report this comment" position="top">
                            <ActionIcon variant="filled" size="xs">
                                <MdReport size={14} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
            </Stack>
            {layout === 'comment' && showReplyEditor && (
                <Stack p={15} ml={10} className={classes.createReply} pb="md">
                    <CreateReply comment={data} setShow={setShowReplyEditor} postId={postId} />
                </Stack>
            )}
            {layout === "comment" && data.children?.length !== 0 && (
                <Stack pl={15} ml={10} className={classes.replies} pb="md">
                    {data?.children?.map((reply, i) => (
                        <Reply reply={reply} postId={postId} is_admin={is_admin} is_moderator={is_moderator} key={i} />
                    ))}
                </Stack>
            )}
            <CommentContentUpdateModal opened={editModal} setOpened={setEditModal} content={data.content} id={data.id} postId={postId} />
            <CommentDeleteModal opened={deleteModal} setOpened={setDeleteModal} id={data.id} postId={postId} hasChildren={data.children?.length !== 0} />
        </>
    )
}