import { createStyles, SimpleGrid, Skeleton } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { EditorCreator } from "../../editors/EditorCreator";
import { EditorWrapper } from "../../editors/EditorWrapper";
import { AmaPostCard } from "../../reusable/post/AmaPostCard";
import { DiscussionPostCard } from "../../reusable/post/DiscussionPostCard";
import { PollPostCard } from "../../reusable/post/PollPostCard";
import { CommunityLayout } from "../../layouts/CommunityLayout";
import { useParams } from "react-router-dom";
import { getPostsFromCategory, getPostsFromType } from "../../../helpers";
import { useQuery } from "react-query";
import { useState } from "react";
import { PlaceholderPostCard } from "../../reusable/post/PlaceholderPostCard";
import { NoResults } from "../../reusable/NoResults";

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
        results: Result[];
    }
}

export interface Result {
    id: number;
    status: string;
    content: string;
    images: Image[];
    link: null;
    category: Category;
    sub_category: Category;
    release_time: null;
    duration: null;
    thumbnail: null;
    is_blur: boolean;
    post_type: string;
    can_vote: boolean;
    can_comment: boolean;
    author: Author;
    group: Group;
    choices: any[];
    choices_voted: boolean;
    num_vote_up: number;
    bookmarks_count: number;
    bookmarked: boolean;
    upvoted: boolean;
    comments_count: number;
    available_awards: any[];
    awards: Awards;
    created_at: Date;
    updated_at: Date;
}

export interface Author {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    avatar: string;
}

export interface Awards {
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    color?: string;
}

export interface Group {
    id: number;
    status: string;
    author: Author;
    subscribers_count: number;
    subscribed: boolean;
    post_count: number;
    is_admin: boolean;
    is_moderator: boolean;
}

export interface Image {
    id: number;
    image: string;
    height: number;
    width: number;
    description: string;
    author: Author;
}

export function CHome() {
    const { classes, cx } = useStyles();

    const { author } = useParams<"author">();
    const { cName } = useParams<"cName">();
    const [clicked, toogle] = useBooleanToggle(false);
    const [posts, setPosts] = useState<Result[]>()

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['cat_posts', author, cName], () => getPostsFromCategory({ username: author, category: cName }), {
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
                        })}
                        {posts?.length === 0 && <NoResults />}

                    </>
                )}
            </SimpleGrid>
        </CommunityLayout>
    );
}
