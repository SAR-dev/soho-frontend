import { Avatar, Group, createStyles, Text, Stack, TypographyStylesProvider, ActionIcon, Tooltip } from '@mantine/core';
import { CommentFooter } from './CommentFooter';
import { MdWavingHand, MdReply, MdReport } from "react-icons/md";
import { FaGift } from 'react-icons/fa';
import { ReplyFooter } from './ReplyFooter';
import { CommentDataParam, TreeCommentDataParam } from '@interfaces/comment';
import { CreateReply } from './CreateReply';
import { useState } from 'react';
import { parseErrors, voteComment } from 'src/helpers';
import { useNotifications } from '@mantine/notifications';
import { X } from 'tabler-icons-react';
import { useQueryClient } from 'react-query';
import { Reply } from './Reply';

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
    menu: {
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[3],
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[4],
        padding: 5,
        borderRadius: theme.radius.sm,
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'none',
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

export function CommentReplyLayout({ layout, data, postId, commentsCount }: { layout: 'comment' | 'reply', data: TreeCommentDataParam, postId: number, commentsCount: number }) {
    const { classes, cx } = useStyles();
    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const [showReplyEditor, setShowReplyEditor] = useState(false)

    const [loading, setLoading] = useState(false)

    const submit = () => {
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
                const oldData: any = queryClient.getQueryData<DataParam>(['comments', postId])
                const newData = oldData
                const commentIndex = newData.data.results.findIndex((e: { id: number }) => e.id === data.id)
                newData.data.results[commentIndex].num_vote_up = res.data.count
                queryClient.setQueryData(['comments', postId], { ...newData })
            }
        })
    }

    return (
        <>
            <Stack spacing={8} className={cx({ [classes.cwrapper]: layout === 'comment' }, { [classes.rwrapper]: layout === 'reply' })}>
                <Group spacing="xs">
                    <Avatar
                        size={20}
                        src={data.author.avatar}
                        radius={20}
                        className={classes.avatar}
                    />
                    <Text size="sm" weight={600} color="yellow">{`${data.author.first_name} ${data.author.last_name}`}</Text>
                    <Text size="sm" weight={600} color="dimmed">2 hours ago</Text>
                    <Group spacing="xs" ml="auto" className={cx(classes.menu, { ['comment-menus']: layout === 'comment' }, { ['reply-menus']: layout === 'reply' })}>
                        <Tooltip label="Clap" position="top">
                            <ActionIcon variant="filled" size="xs" loading={loading} onClick={() => submit()}>
                                <MdWavingHand size={14} className="wave" />
                            </ActionIcon>
                        </Tooltip>
                        {layout === "comment" && (
                            <Tooltip label="Whisper" position="top">
                                <ActionIcon variant="filled" size="xs" onClick={() => setShowReplyEditor(true)}>
                                    <MdReply size={14} />
                                </ActionIcon>
                            </Tooltip>
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
                <TypographyStylesProvider className={classes.typography}>
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </TypographyStylesProvider>
                {layout === "comment" && <CommentFooter commentsCount={commentsCount} clapCount={data.num_vote_up} />}
                {layout === "reply" && <ReplyFooter clapCount={data.num_vote_up} />}
            </Stack>
            {layout === 'comment' && showReplyEditor && (
                <Stack p={15} ml={10} className={classes.createReply} pb="md">
                    <CreateReply comment={data} setShow={setShowReplyEditor} postId={postId} />
                </Stack>
            )}
            {layout === "comment" && data.children?.length !== 0 && (
                <Stack pl={15} ml={10} className={classes.replies} pb="md">
                    {data?.children?.map((reply, i) => (
                        <Reply reply={reply} postId={postId} key={i} />
                    ))}
                </Stack>
            )}
        </>
    )
}