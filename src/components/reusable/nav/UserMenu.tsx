import { createStyles, Menu, Text, ActionIcon, Divider } from "@mantine/core";
import { Settings, Search, Photo, MessageCircle, ArrowBarLeft, ArrowsLeftRight, DotsCircleHorizontal } from 'tabler-icons-react';
import { getAuth, signOut } from "firebase/auth";

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

    const signOutAndClearLocale = () => {
        const auth = getAuth();
        signOut(auth)
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
