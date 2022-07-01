import { Avatar, Group, createStyles, Text, Stack, TypographyStylesProvider, ActionIcon, Tooltip } from '@mantine/core';
import { CommentFooter } from './CommentFooter';
import { Reply } from './Reply';
import { MdWavingHand, MdReply, MdReport } from "react-icons/md";
import { FaGift } from 'react-icons/fa';
import { ReplyFooter } from './ReplyFooter';
import { CommentDataParam } from '@interfaces/comment';
import { CreateComment } from './CreateComment';
import { CreateReply } from './CreateReply';
import { useState } from 'react';

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

export function CommentReplyLayout({ layout, data, postId }: { layout: 'comment' | 'reply', data: CommentDataParam, postId: number }) {
    const { classes, cx } = useStyles();
    const [showReplyEditor, setShowReplyEditor] = useState(false)

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
                            <ActionIcon variant="filled" size="xs">
                                <MdWavingHand size={14} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Add Reply" position="top">
                            <ActionIcon variant="filled" size="xs" onClick={() => setShowReplyEditor(true)}>
                                <MdReply size={14} />
                            </ActionIcon>
                        </Tooltip>
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
                {layout === "comment" && <CommentFooter />}
                {layout === "reply" && <ReplyFooter />}
            </Stack>
            {layout === 'comment' && showReplyEditor && (
                <Stack p={15} ml={10} className={classes.createReply} pb="md">
                    <CreateReply comment={data} setShow={setShowReplyEditor} postId={postId} />
                </Stack>
            )}
            {/* {layout === "comment" && (
                <Stack pl={15} ml={10} className={classes.replies} pb="md">
                    <Reply />
                    <Reply />
                    <Reply />
                </Stack>
            )} */}
        </>
    )
}