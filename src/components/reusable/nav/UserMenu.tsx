import {
    createStyles,
    Menu,
    Text,
    ActionIcon,
    Avatar,
    Divider,
} from "@mantine/core";
import { Settings, Search, Photo, MessageCircle, ArrowBarLeft, ArrowsLeftRight, DotsCircleHorizontal } from 'tabler-icons-react';
import { getAuth, signOut } from "firebase/auth";
import useStore from "../../../store";
import { useNotifications } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
    link: {
        borderRadius: theme.radius.sm,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[3],

        "&:hover": {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][1],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
        },
    },
}));

export function UserMenu() {
    const { classes } = useStyles();
    const { removeToken } = useStore();
    const notifications = useNotifications();

    const signOutAndClearLocale = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            removeToken()
        }).catch((error) => {
            notifications.showNotification({
                title: "Error Occured !",
                message: "We couldn't sign you out from this device. Please try again later.",
                color: 'red',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
            })
        });
    }

    return (
        <Menu control={<ActionIcon radius="md" size="lg" variant="light" title="User Menu" className={classes.link}>
            <DotsCircleHorizontal size={18} />
        </ActionIcon>}>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
            <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
            <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
            <Menu.Item
                icon={<Search size={14} />}
                rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
            >
                Search
            </Menu.Item>

            <Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<ArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
            <Menu.Item color="red" icon={<ArrowBarLeft size={14} />} onClick={() => signOutAndClearLocale()}>Sign Out</Menu.Item>
        </Menu>
    );
}
