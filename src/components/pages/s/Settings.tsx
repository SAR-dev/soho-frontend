import { createStyles, Navbar, Text, SimpleGrid, Grid } from '@mantine/core';
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
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
    },

    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        marginBottom: theme.spacing.md,
        paddingBottom: theme.spacing.md,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
        width: "100%"
    }
}));

export function Settings() {
    const { classes, cx } = useStyles();

    return (
        <SettingsLayout>
            <Grid>
                <Grid.Col span={4}></Grid.Col>
                <Grid.Col span={4}></Grid.Col>
            </Grid>
            {/* <SimpleGrid cols={2} spacing="md" style={{ width: "100%", padding: 25 }}>
                <div className={classes.box}>
                    <Text className={classes.title}>Profile Settings</Text>
                    <ProfileSettings />
                </div>
                <div className={classes.box}>
                    <Text className={classes.title}>Group Settings</Text>
                    <GroupSettings />
                </div>
                <div className={classes.box}>
                    <Text className={classes.title}>Payment Settings</Text>
                    <PaymentSettings />
                </div>
                <div className={classes.box}>
                    <Text className={classes.title}>Subscriptions</Text>
                    <Subscriptions />
                </div>
                <div className={classes.box}>
                    <Text className={classes.title}>Earnings</Text>
                    <Earnings />
                </div>
            </SimpleGrid> */}
        </SettingsLayout>
    );
}