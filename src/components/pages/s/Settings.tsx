import { createStyles, Navbar, Text, SimpleGrid } from '@mantine/core';
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
    },

    box: {
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
    }
}));

export function Settings() {
    const { classes, cx } = useStyles();
    const { author } = useParams<"author">();
    const { sType } = useParams<"sType">();

    return (
        <SettingsLayout>
            <SimpleGrid cols={2} spacing="md" style={{ width: "100%", padding: 25 }}>
                <div className={classes.box}>
                    <ProfileSettings />
                </div>
                <div className={classes.box}>
                    <GroupSettings />
                </div>
                <div className={classes.box}>
                    <PaymentSettings />
                </div>
                <div className={classes.box}>
                    <Subscriptions />
                </div>
                <div className={classes.box}>
                    <Earnings />
                </div>
            </SimpleGrid>
        </SettingsLayout>
    );
}