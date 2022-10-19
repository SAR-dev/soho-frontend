import { createStyles, SimpleGrid } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { EditorCreator } from "../../../editors/EditorCreator";
import { EditorWrapper } from "../../../editors/EditorWrapper";
import { DiscussionPostCard } from "../../../reusable/post/DiscussionPostCard";
import { CommunityLayout } from "../../../layouts/CommunityLayout";
import { useParams } from "react-router-dom";
import { getPostsFromSubCategory } from "../../../../helpers";
import { useQuery } from "react-query";
import { PlaceholderPostCard } from "../../../reusable/post/PlaceholderPostCard";
import { NoResults } from "../../../reusable/NoResults";
import { PostDataParam } from "@interfaces/post";
import { FetchError } from "@reusable/FetchError";

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

export function SHome() {
    const { classes, cx } = useStyles();

    const { author } = useParams<"author">();
    const { sName } = useParams<"sName">();
    const [clicked, toogle] = useBooleanToggle(false);

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['sub_cat_posts', author, sName], () => getPostsFromSubCategory({ username: author, sub_category: sName }))

    if (isError) return (
        <CommunityLayout>
            <FetchError />
        </CommunityLayout>
    )

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
                        {data?.data.results?.map((el, i) => {
                            if (el.post_type === "discussion") return (
                                <DiscussionPostCard {...el} key={i} />)
                        })}
                        {data?.data.results?.length === 0 && <NoResults text="Posts" />}
                    </>
                )}
            </SimpleGrid>
        </CommunityLayout>
    );
}
