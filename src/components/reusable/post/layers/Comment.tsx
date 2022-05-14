import { Avatar, Group, createStyles, Text, Stack, TypographyStylesProvider } from '@mantine/core';
import { CommentFooter } from './CommentFooter';

const text = `<p>Django is a Python-based web framework that allows you to quickly create efficient web applications. If you are new to Django then you can refer to Django Introduction and Installation. Here we are going to learn How to create a Django project using Firebase as Database .</p>`

const useStyles = createStyles((theme, _params, getRef) => ({
    avatar: {
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[3],
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[4],
    },
    typography: {
        fontSize: theme.fontSizes.sm,
      },
}));

export function Comment() {
    const { classes } = useStyles();

    return (
        <Stack spacing={8}>
            <Group spacing="xs">
                <Avatar
                    size={20}
                    src={`https://avatars.dicebear.com/api/micah/seed.svg`}
                    radius={20}
                    className={classes.avatar}
                />
                <Text size="sm" weight={600} color="yellow">Sayed Ar Rafi</Text>
                <Text size="sm" weight={600} color="dimmed">2 hours ago</Text>
            </Group>
            <TypographyStylesProvider className={classes.typography}>
                <div dangerouslySetInnerHTML={{ __html: text }} />
            </TypographyStylesProvider>
            <CommentFooter />
        </Stack>
    )
}
