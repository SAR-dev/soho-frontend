import { useState, useMemo } from "react";
import { createStyles, Group, Select, Text, Stack, AvatarsGroup, Avatar, Center } from "@mantine/core";
import { Comment } from "./Comment";
import { CommentAward } from "./CommentAward";
import { useQuery } from "react-query";
import { capitalizeFirstLetter, doubleDigit, getComments } from "../../../helpers";
import { CommentDataParam, TreeCommentDataParam } from "@interfaces/comment";
import { NoResults } from "../../reusable/NoResults";
import {arrayToTree} from "performant-array-to-tree";
import { CommentPlaceholder } from "./CommentPlaceholder";
import sortArray from 'sort-array'
import { FaCodeBranch } from "react-icons/fa";

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

export function Comments({ postId, members_name }: { postId: number, members_name: string }) {
    const { classes } = useStyles();
    const [uniqueUsers, setUniqueUsers] = useState<string[]>([])

    const [treeComments, setTreeComments] = useState<TreeCommentDataParam[]>()

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['comments', postId], () => getComments({ postId: postId }), {
        onSuccess: res => {
            setUniqueUsers(uniqueUserAvatars())
            if (res?.data.results) {
                const sorted = arrayToTree(res?.data.results, {
                    childrenField: "children",
                    parentId: "parent",
                    id: "id",
                    dataField: ""
                })
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setTreeComments(sorted)
            }
        }
    })

    const [sortBy, setSortBy] = useState('');

    const uniqueUserAvatars = () => [...new Set(data?.data.results?.map(item => item.author.avatar))];

    if (isLoading) return (
        <Stack spacing="lg" mt="lg" className={classes.wrapper}>
            {[...Array(6)].map((e, i) => (
                <CommentPlaceholder key={i} />
            ))}
        </Stack>
    )

    return (
        <div className={classes.wrapper}>
            <Group>
                <Center>
                    <FaCodeBranch size={16} />
                    <Text size="sm" color="dimmed" ml={5} weight={600}>Conversation</Text>
                </Center>
                <Text size="sm" color="dimmed" weight={600}>{doubleDigit(uniqueUsers.length)} {`${capitalizeFirstLetter(members_name)}s`}</Text>
                <Text size="sm" color="dimmed" weight={600}>{data?.data.results && doubleDigit(data?.data.results?.length)} Responses</Text>
                <Select
                    placeholder="Sort By"
                    data={[{ value: 'created_at', label: 'Date' }, { value: 'num_vote_up', label: 'Popularity' }, { value: 'num_vote_up', label: 'Claps' }]}
                    value={sortBy}
                    onChange={e => setSortBy(e!)}
                    required
                    size="xs"
                    ml="auto"
                />
            </Group>
            {data?.data.results?.length === 0 && <NoResults text="Comments" />}
            {uniqueUsers.length > 8 && (
                <AvatarsGroup limit={10} total={uniqueUsers.length} mt="lg">
                    {uniqueUsers.map((_, i) =>
                        <Avatar src={_} className={classes.avatar} key={i} />
                    )}
                </AvatarsGroup>
            )}
            <Stack spacing="lg" mt="lg">
                {treeComments && sortArray(treeComments, {by: sortBy, order: 'desc'}).map((el, i) => (
                    <Comment comment={el} postId={postId} commentsCount={el.children?.length} key={i} />
                ))}
                {/* <CommentAward /> */}
            </Stack>
        </div>
    );
}
