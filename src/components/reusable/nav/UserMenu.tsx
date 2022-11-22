import { createStyles, ActionIcon } from "@mantine/core";
import { Settings } from 'tabler-icons-react';
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";

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

export function UserMenu({ username }: { username?: string }) {
    const { classes } = useStyles();

    const signOutAndClearLocale = () => {
        const auth = getAuth();
        signOut(auth)
    }

    return (
        <>
            <ActionIcon radius="md" size="lg" variant="light" title="Settings" className={classes.link}  component={Link} to={`/s/${username}/t/settings`}>
                <Settings size={18} />
            </ActionIcon>
            <ActionIcon radius="md" size="lg" variant="light" title="Sign Out" className={classes.link}  onClick={() => signOutAndClearLocale()}>
                <IoExitOutline size={18} />
            </ActionIcon>
        </>
    );
}
