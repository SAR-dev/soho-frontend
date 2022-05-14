import { Avatar, Group, createStyles, Text, Stack, TypographyStylesProvider, ActionIcon } from '@mantine/core';
import { Adjustments } from 'tabler-icons-react';
import { CommentFooter } from './CommentFooter';
import { Reply } from './Reply';
import { MdWavingHand, MdReply, MdReport } from "react-icons/md";
import { FaGift } from 'react-icons/fa';
import { ReplyFooter } from './ReplyFooter';

const text = `<p>Django is a Python-based web framework that allows you to quickly create efficient web applications. If you are new to Django then you can refer to Django Introduction and Installation. Here we are going to learn How to create a Django project using Firebase as Database .</p>`

interface Props {
    layout: 'comment' | 'reply'
}

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
    }
}));

export function CommentReplyLayout({ layout }: Props) {
    const { classes, cx } = useStyles();

    return (
        <>
        <Stack spacing={8} className={cx({ [classes.cwrapper]: layout === 'comment' }, { [classes.rwrapper]: layout === 'reply' })}>
            <Group spacing="xs">
                <Avatar
                    size={20}
                    src={`https://avatars.dicebear.com/api/micah/seed.svg`}
                    radius={20}
                    className={classes.avatar}
                />
                <Text size="sm" weight={600} color="yellow">Sayed Ar Rafi</Text>
                <Text size="sm" weight={600} color="dimmed">2 hours ago</Text>
                <Group spacing="xs" ml="auto" className={cx(classes.menu, { ['comment-menus']: layout === 'comment' }, { ['reply-menus']: layout === 'reply' })}>
                    <ActionIcon variant="filled" size="xs">
                        <MdWavingHand size={14} />
                    </ActionIcon>
                    <ActionIcon variant="filled" size="xs">
                        <MdReply size={14} />
                    </ActionIcon>
                    <ActionIcon variant="filled" size="xs">
                        <FaGift size={14} />
                    </ActionIcon>
                    <ActionIcon variant="filled" size="xs">
                        <MdReport size={14} />
                    </ActionIcon>
                </Group>
            </Group>
            <TypographyStylesProvider className={classes.typography}>
                <div dangerouslySetInnerHTML={{ __html: text }} />
            </TypographyStylesProvider>
            {layout === "comment" && <CommentFooter />}
            {layout === "reply" && <ReplyFooter />}
        </Stack>
        {layout === "comment" && (
            <Stack pl={15} ml={10} className={classes.replies} pb="md">
                <Reply />
                <Reply />
                <Reply />
            </Stack>
        )}
        </>
    )
}