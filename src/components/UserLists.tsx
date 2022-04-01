import { useState } from 'react';
import { createStyles, UnstyledButton, Tooltip, Title, Avatar } from '@mantine/core';

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
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4],
        },
    },

    initialMainLink: {
        marginTop: theme.spacing.md,
    },

    mainLinkActive: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][1],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        },
    },


}));

const mainLinksMockdata = [
    { label: 'Home' },
    { label: 'Dashboard' },
    { label: 'Analytics' },
    { label: 'Releases' },
    { label: 'Account' },
    { label: 'Security' },
    { label: 'Settings' },
    { label: 'Home' },
    { label: 'Dashboard' },
    { label: 'Analytics' },
    { label: 'Releases' },
    { label: 'Account' },
    { label: 'Security' },
    { label: 'Settings' },
    { label: 'Home' },
    { label: 'Dashboard' },
    { label: 'Analytics' },
    { label: 'Releases' },
    { label: 'Account' },
    { label: 'Security' },
    { label: 'Settings' },
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
                        className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === active }, { [classes.initialMainLink]: i === 0 })}
                    >
                        <Avatar src={"https://avatars.dicebear.com/api/micah/seed" + i + ".svg"} size={"sm"} />
                    </UnstyledButton>
                </Tooltip>
            ))
            }
        </>
    );
}