import { createStyles, Group, Indicator, Skeleton, Stack } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        position: "relative",
        padding: theme.spacing.xl,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        display: "flex",
    },
    avatarWrapper: {
        marginRight: theme.spacing.md,
    },
    flex: {
        display: "flex",
        alignItems: "center",
    },
    typography: {
        fontSize: theme.fontSizes.sm,
        marginTop: theme.spacing.xs,
        marginBottom: theme.spacing.lg,
    },
    fullWidth: {
        width: "100%"
    }
}));

export function PlaceholderPostCard() {
    const { classes, cx } = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.avatarWrapper}>
                <Indicator
                    inline
                    size={18}
                    offset={10}
                    position="bottom-end"
                    className="circular"
                    withBorder
                    color="gray"
                    style={{ zIndex: 2 }}
                >
                    <Skeleton circle height={60} />
                </Indicator>
            </div>
            <div className={classes.fullWidth}>
                <Stack spacing="sm">
                    <Group spacing="xs">
                        <Skeleton height={14} width={100} />
                    </Group>
                    <Group spacing="xs">
                        <div className={classes.flex}>
                            <Skeleton height={14} width={150} />
                        </div>
                    </Group>
                </Stack>
                <div className={classes.typography}>
                    {[...Array(5)].map((e, i) => (
                        <Skeleton height={14} mb="xs" key={i} />
                    ))}
                </div>
                <Skeleton height={350} mb="xs" />
                <Group spacing="lg">
                    {[...Array(5)].map((e, i) => (
                        <Skeleton height={20} width={50} key={i} />
                    ))}
                </Group>
            </div>
        </div>
    );
}
