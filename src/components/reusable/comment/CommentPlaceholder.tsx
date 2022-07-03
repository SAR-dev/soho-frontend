import { Avatar, Group, createStyles, Text, Stack, TypographyStylesProvider, ActionIcon, Tooltip, Indicator, Skeleton } from '@mantine/core';
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
    typography: {
        fontSize: theme.fontSizes.sm,
        marginTop: theme.spacing.xs
    },
}));

export function CommentPlaceholder() {
    const { classes, cx } = useStyles();

    return (
        <Stack spacing={8} className={classes.cwrapper}>
            <Group spacing="xs">
                <div>
                    <Skeleton circle height={20} />
                </div>
                <Skeleton height={14} width={100} />
                <Skeleton height={14} width={100} />
            </Group>
            <div className={classes.typography}>
                {[...Array(3)].map((e, i) => (
                    <Skeleton height={14} mb="xs" key={i} />
                ))}
            </div>
            <Group spacing="xs">
                {[...Array(6)].map((e, i) => (
                    <Skeleton height={14} width={65} key={i} />
                ))}
            </Group>
        </Stack>
    )
}