import { createStyles, ActionIcon, Button, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    link: {
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === "dark" ? "yellow" : theme.colors.gray[7],
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

function ThemeSwitcher({ size }: { size: number }) {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon
            variant="filled"
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            radius="md"
            size="lg"
            className={classes.link}
        >
            {dark ? <Sun size={size} /> : <MoonStars size={size} />}
        </ActionIcon>
    );
}

export default ThemeSwitcher