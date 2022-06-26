import { createStyles, SimpleGrid, Skeleton } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { EditorCreator } from "../../editors/EditorCreator";
import { EditorWrapper } from "../../editors/EditorWrapper";
import { AmaPostCard } from "../../reusable/post/AmaPostCard";
import { DiscussionPostCard } from "../../reusable/post/DiscussionPostCard";
import { PollPostCard } from "../../reusable/post/PollPostCard";
import { CommunityLayout } from "../../layouts/CommunityLayout";
import { useParams } from "react-router-dom";
import { getPostsFromType } from "../../../helpers";
import { useQuery } from "react-query";
import { useState } from "react";
import { PlaceholderPostCard } from "../../reusable/post/PlaceholderPostCard";
import { NoResults } from "../../reusable/NoResults";
import { PostDataParam } from "@interfaces/post";

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        position: "relative",
        padding: theme.spacing.xl,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        display: "flex",
    }
}));


export interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: PostDataParam[];
    }
}

export function PType() {
    const { classes, cx } = useStyles();

    const { author } = useParams<"author">();
    const { pType } = useParams<"pType">();
    const [clicked, toogle] = useBooleanToggle(false);
    const [posts, setPosts] = useState<PostDataParam[]>()

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['type_posts', author, pType], () => getPostsFromType({ username: author, type: pType || "all" }), {
        onSuccess: res => {
            setPosts([...res.data.results])
        }
    })

    return (
        <CommunityLayout>
            <SimpleGrid cols={1} spacing={3}>
                {clicked ? <EditorWrapper toogle={toogle} /> : <EditorCreator toogle={toogle} />}
                {isLoading ? (
                    <>
                        {[...Array(5)].map((e, i) => (
                            <PlaceholderPostCard key={i} />
                        ))}
                    </>
                ) : (
                    <>
                        {posts?.map((el, i) => {
                            if (el.post_type === "discussion") return (
                                <DiscussionPostCard {...el} key={i} />)
                            if (el.post_type === "poll") return (
                                <PollPostCard {...el} key={i} />)
                            if (el.post_type === "ama") return (
                                <AmaPostCard {...el} key={i} />)
                        })}
                        {posts?.length === 0 && <NoResults />}
                    </>
                )}
            </SimpleGrid>
        </CommunityLayout>
    );
}
