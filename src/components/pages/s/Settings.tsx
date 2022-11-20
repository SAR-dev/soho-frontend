import { createStyles, Navbar, Text } from '@mantine/core';
import { SettingsLayout } from '@layouts/SettingsLayout';
import { Link, useParams } from 'react-router-dom';
import { ProfileSettings } from './ProfileSettings';
import { GroupSettings } from './GroupSettings';
import { RiChatFollowUpFill, RiGroup2Line, RiMapPinUserLine } from 'react-icons/ri';
import { MdMoney, MdOutlinePayments } from 'react-icons/md';
import { PaymentSettings } from './PaymentSettings';
import { Subscriptions } from './Subscriptions';
import { Earnings } from './Earnings';

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
        display: 'flex',
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
        alignItems: 'center',

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
    { name: "Profile", path: "profile", icon: <RiMapPinUserLine size={20} /> }, // avatar, name, username
    { name: "Group", path: "group", icon: <RiGroup2Line size={20} /> }, // slogan, rules, members name, token
    { name: "Payment", path: "payment", icon: <MdOutlinePayments size={20} /> },
    { name: "Subscriptions", path: "subscriptions", icon: <RiChatFollowUpFill size={20} /> },
    { name: "Earnings", path: "earnings", icon: <MdMoney size={20} /> },
    // { name: "Blacklist", path: "blacklist" },
    // { name: "Moderator", path: "moderator" },
    // { name: "Soho", path: "soho" },
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
            {link.icon}
            <Text ml="xs">{link.name}</Text>
        </Link>
    ));

    return (
        <SettingsLayout>
            <Navbar height={"calc(100vh - 50px)"} width={{ sm: 300 }}>
                <Navbar.Section grow className={classes.wrapper}>
                    <div className={classes.main}>
                        {links}
                    </div>
                </Navbar.Section>
            </Navbar>
            <div className={classes.body}>
                {sType === "profile" && <ProfileSettings />}
                {sType === "group" && <GroupSettings />}
                {sType === "payment" && <PaymentSettings />}
                {sType === "subscriptions" && <Subscriptions />}
                {sType === "earnings" && <Earnings />}
            </div>
        </SettingsLayout>
    );
}