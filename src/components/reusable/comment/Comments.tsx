import { useState } from "react";
import { createStyles, Group, Select, Text, Stack, AvatarsGroup, Avatar } from "@mantine/core";
import { Comment } from "./Comment";
import { CommentAward } from "./CommentAward";

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        position: "relative",
        padding: theme.spacing.xl,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
    },
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
                <Text size="sm" color="dimmed" weight={600}>Conversation</Text>
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
            <AvatarsGroup limit={10} total={17} mt="lg">
                {[...Array(25)].map((_, i) =>
                    <Avatar src={`https://avatars.dicebear.com/api/micah/seeds${i}.svg`} className={classes.avatar} key={i} />
                )}
            </AvatarsGroup>
            <Stack spacing="lg" mt="lg">
                <Comment />
                <CommentAward />
                <CommentAward />
                <Comment />
            </Stack>
        </div>
    );
}
