import { useState } from 'react';
import { createStyles, UnstyledButton, Tooltip, Title, Avatar } from '@mantine/core';
import {
    Home2,
    Gauge,
    DeviceDesktopAnalytics,
    Fingerprint,
    CalendarStats,
    User,
    Settings,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    mainLink: {
        width: 44,
        height: 44,
        borderRadius: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        marginBottom: theme.spacing.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[5],
        },
    },

    mainLinkActive: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.5)
                    : theme.colors[theme.primaryColor][2],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        },
    },
}));

const mainLinksMockdata = [
    { icon: Home2, label: 'Home' },
    { icon: Gauge, label: 'Dashboard' },
    { icon: DeviceDesktopAnalytics, label: 'Analytics' },
    { icon: CalendarStats, label: 'Releases' },
    { icon: User, label: 'Account' },
    { icon: Fingerprint, label: 'Security' },
    { icon: Settings, label: 'Settings' },
];

export default function UserLists() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Releases');

    return (
        <>
            {mainLinksMockdata.map((link, i) => (
                <Tooltip label={link.label} position="right" withArrow transitionDuration={0} key={link.label}>
                    <UnstyledButton
                        onClick={() => setActive(link.label)}
                        className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === active })}
                    >
                        <Avatar src={"https://avatars.dicebear.com/api/micah/seed" + i + ".svg"} size={"sm"} />
                    </UnstyledButton>
                </Tooltip>
            ))
            }
        </>
    );
}