import { Paper, SegmentedControl, createStyles, List, ThemeIcon, SimpleGrid, Group, Avatar, Text, Badge } from '@mantine/core'
import { CircleCheck, CircleDashed } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        padding: theme.spacing.md
    },
    menus: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[1],
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.md,
        width: "-webkit-fill-available",
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[1],
        padding: theme.spacing.sm,
        borderRadius: theme.spacing.xs,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2],
          },
    },
    avatar: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[1],
    },
    badge: {
        marginLeft: 'auto'
    }
}));

const users = [
    {
        "name": "Robert Wolfkisser",
        "email": "rob_wolf@gmail.com",
    },
    {
        "name": "Jill Jailbreaker",
        "email": "jj@breaker.com",
    },
    {
        "name": "Henry Silkeater",
        "email": "henry@silkeater.io",
    },
    {
        "name": "Bill Horsefighter",
        "email": "bhorsefighter@gmail.com",
    },
    {
        "name": "Jeremy Footviewer",
        "email": "jeremy@foot.dev",
    }
]

export function TopClaps() {
    const { classes } = useStyles();

    return (
        <Paper className={classes.wrapper}>
            <Text size="xs" color="dimmed" align="center">Top Contributors</Text>
            <SegmentedControl
                data={[
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                ]}
                className={classes.menus}
            />
            <SimpleGrid cols={1} spacing="md">
                {users.map((user, i) => (
                    <div className={classes.flex}>
                        <Group spacing="sm">
                            <Avatar size={40} src={`https://avatars.dicebear.com/api/micah/${user.name}.svg`} radius={40} className={classes.avatar} />
                            <div>
                                <Text size="sm" weight={500}>
                                    {user.name}
                                </Text>
                                <Text size="xs" color="dimmed">
                                    {user.email}
                                </Text>
                            </div>
                        </Group>
                        <Badge className={classes.badge}>34</Badge>
                    </div>
                ))}
            </SimpleGrid>
        </Paper>
    )
}
