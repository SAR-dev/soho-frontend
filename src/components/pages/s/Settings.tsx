import { createStyles, Navbar } from '@mantine/core';
import { SettingsLayout } from '@layouts/SettingsLayout';
import { Link, useParams } from 'react-router-dom';
import { ProfileSettings } from './ProfileSettings';
import { GroupSettings } from './GroupSettings';

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
    },
    main: {
        flex: 1,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        paddingTop: theme.spacing.md
    },
    mainLink: {
        width: 44,
        height: 44,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    mainLinkActive: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        },
    },

    link: {
        boxSizing: 'border-box',
        display: 'block',
        textDecoration: 'none',
        borderTopRightRadius: theme.radius.md,
        borderBottomRightRadius: theme.radius.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        padding: `0 ${theme.spacing.md}px`,
        fontSize: theme.fontSizes.sm,
        marginRight: theme.spacing.md,
        fontWeight: 500,
        height: 44,
        lineHeight: '44px',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    linkActive: {
        '&, &:hover': {
            borderLeftColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
            backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
            color: theme.white,
        },
    },

    body: {
        padding: theme.spacing.md
    }
}));

const SettingsMenus = [
    { name: "Profile", path: "profile" }, // avatar, name, username
    { name: "Group", path: "group" }, // slogan, rules, members name, token
    { name: "Blacklist", path: "blacklist" },
    { name: "Moderator", path: "moderator" },
    { name: "Soho", path: "soho" },
]

export function Settings() {
    const { classes, cx } = useStyles();
    const { author } = useParams<"author">();
    const { sType } = useParams<"sType">();

    const links = SettingsMenus.map((link) => (
        <Link
            className={cx(classes.link, { [classes.linkActive]: sType === link.path })}
            to={`/s/${author}/t/${link.path}`}
            key={link.path}
        >
            {link.name}
        </Link>
    ));

    return (
        <SettingsLayout>
            <Navbar height={750} width={{ sm: 300 }}>
                <Navbar.Section grow className={classes.wrapper}>
                    <div className={classes.main}>
                        {links}
                    </div>
                </Navbar.Section>
            </Navbar>
            <div className={classes.body}>
                {sType === "profile" && <ProfileSettings />}
                {sType === "group" && <GroupSettings />}
            </div>
        </SettingsLayout>
    );
}