import { SimpleGrid, Skeleton } from "@mantine/core";
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

export function PType() {
    const { author } = useParams<"author">();
    const { pType } = useParams<"pType">();
    const [clicked, toogle] = useBooleanToggle(false);
    const [posts, setPosts] = useState<Result[]>()

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['posts', author, pType], () => getPostsFromType({ username: author, type: pType }), {
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
                        <Skeleton height={50} circle mb="xl" />
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    </>
                ) : (
                    <>
                        {posts?.map(el => {
                            if (el.post_type === "post") return (
                            <DiscussionPostCard
                                postedAt="10 minutes ago"
                                body={el.content}
                                author={{
                                    name: "Jacob Warnhalter",
                                    image:
                                        "https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png",
                                }}
                                temp="120"
                            />)
                        })}</>
                )}


                {/* <PollPostCard
                    postedAt="10 minutes ago"
                    body={demoHtmlText}
                    author={{
                        name: "Jacob Warnhalter",
                        image:
                            "https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png",
                    }}
                    temp="120"
                />
                <AmaPostCard
                    postedAt="10 minutes ago"
                    body={demoText}
                    author={{
                        name: "Jacob Warnhalter",
                        image:
                            "https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png",
                    }}
                    temp="120"
                /> */}
            </SimpleGrid>
        </CommunityLayout>
    );
}
