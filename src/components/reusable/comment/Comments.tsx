import { useState } from "react";
import { createStyles, Group, Select, Text, Stack, AvatarsGroup, Avatar } from "@mantine/core";
import { Comment } from "./Comment";
import { CommentAward } from "./CommentAward";
import { useQuery } from "react-query";
import { doubleDigit, getComments } from "../../../helpers";
import { CommentDataParam } from "@interfaces/comment";
import { NoResults } from "../../reusable/NoResults";

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

export interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: CommentDataParam[];
    }
}

export function Comments({ postId }: { postId: number }) {
    const { classes } = useStyles();
    const [comments, setComments] = useState<CommentDataParam[]>()
    const [uniqueUsers, setUniqueUsers] = useState<string[]>([])

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['comments', postId], () => getComments({ postId: postId }), {
        onSuccess: res => {
            setComments([...res.data.results])
            setUniqueUsers(uniqueUserAvatars())
        }
    })

    const [sortBy, setSortBy] = useState('');

    const uniqueUserAvatars = () => [...new Set(comments?.map(item => item.author.avatar))];

    return (
        <div className={classes.wrapper}>
            <Group>
                <Text size="sm" color="dimmed" weight={600}>Conversation</Text>
                <Text size="sm" color="dimmed" weight={600}>{doubleDigit(uniqueUsers.length)} Participants</Text>
                <Text size="sm" color="dimmed" weight={600}>{comments && doubleDigit(comments?.length)} Comments</Text>
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
            {comments?.length === 0 && <NoResults />}
            <AvatarsGroup limit={10} total={uniqueUsers.length} mt="lg">
                {uniqueUsers.map((_, i) =>
                    <Avatar src={_} className={classes.avatar} key={i} />
                )}
            </AvatarsGroup>
            <Stack spacing="lg" mt="lg">
                {comments?.map((el, i) => (
                    <Comment {...el} key={i} />
                ))}
                {/* <Comment />
                <CommentAward />
                <CommentAward />
                <Comment /> */}
            </Stack>
        </div>
    );
}
