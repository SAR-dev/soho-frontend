import { useState } from 'react';
import {
    createStyles,
    Navbar,
    TextInput,
    UnstyledButton,
    Badge,
    Text,
    Group,
    ActionIcon,
    Tooltip,
    ScrollArea,
    Modal,
} from '@mantine/core';
import { Search, Plus, Microphone2, ListCheck, Video } from 'tabler-icons-react';
import { UserButton } from './UserButton';
import { Channels } from './Channels';
import { ChannelCreateForm } from './ChannelCreateForm';
import { MdEmojiPeople, MdQuestionAnswer, MdWavingHand } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const useStyles = createStyles((theme) => ({
    mainLink: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontSize: theme.fontSizes.xs,
        padding: `8px ${theme.spacing.xs}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    mainLinkInner: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    },

    mainLinkIcon: {
        marginRight: theme.spacing.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    },

    mainLinkBadge: {
        padding: 0,
        width: 20,
        height: 20,
        pointerEvents: 'none',
    },
    linkActive: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][1],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
        },
    },
}));

const links = [
    { icon: MdEmojiPeople, label: 'Discussion', slug: "discussion", notifications: 3 },
    { icon: MdQuestionAnswer, label: 'AMA', slug: "ama", notifications: 4 },
    { icon: Video, label: 'Premier', slug: "premier", },
    // { icon: BsDropletHalf, label: 'Drop'slug: "drop", },
    { icon: Microphone2, label: 'Announcement', slug: "announcement", },
    { icon: ListCheck, label: 'Rules', slug: "rules", },
];

export function Categories() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Discussion');


    return (
        <>
            {links.map((link, i) => (
                <UnstyledButton className={cx(classes.mainLink, { [classes.linkActive]: active === link.label })} onClick={() => setActive(link.label)} key={i}>
                    <div className={classes.mainLinkInner}>
                        <link.icon size={20} className={classes.mainLinkIcon} />
                        <span>{link.label}</span>
                    </div>
                    {link.notifications && (
                        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
                            {link.notifications}
                        </Badge>
                    )}
                </UnstyledButton>
            ))}
        </>
    );
}