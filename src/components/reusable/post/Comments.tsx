import { useState } from "react";
import { createStyles, Group, Select, Text, Stack } from "@mantine/core";
import { Comment } from "./layers/Comment";

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        position: "relative",
        padding: theme.spacing.xl,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
    },
    editorWrapper: {
        width: "100%",
    },
    commentCreatorHeader: {
        marginBottom: theme.spacing.xs
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        ['svg']: {
            marginRight: 3
        }
    }
}));

export function Comments() {
    const { classes } = useStyles();
    const [sortBy, setSortBy] = useState('');

    return (
        <div className={classes.wrapper}>
            <Group>
                <Text size="sm" color="dimmed" weight={600}>Comments (59)</Text>
                <Select
                    placeholder="Sort By"
                    data={[{ value: '1', label: 'Date' }, { value: '2', label: 'Popularity' }, { value: '3', label: 'Replies' }, { value: '4', label: 'Claps' }]}
                    value={sortBy}
                    onChange={e => setSortBy(e!)}
                    required
                    size="xs"
                    ml="auto"
                />
            </Group>
            <Stack spacing="lg" mt="lg">
                <Comment />
                <Comment />
            </Stack>
        </div>
    );
}
