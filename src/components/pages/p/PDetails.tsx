import { CommunityLayout } from "../../layouts/CommunityLayout";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../../../helpers";
import { useQuery } from "react-query";
import { PlaceholderPostCard } from "../../reusable/post/PlaceholderPostCard";
import { PostDetails } from "../../reusable/post/PostDetails";
import { FetchError } from "../../reusable/FetchError";

export interface DataParam {
    data: Result
}

export interface Result {
    id: number;
    status: string;
    content: string;
    images: any[];
    link: null;
    category: Category;
    sub_category: Category;
    release_time: null;
    duration: null;
    thumbnail: null;
    is_blur: boolean;
    post_type: string;
    pinned_comment: null;
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

export function PDetails() {
    const { pId } = useParams<"pId">();

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['post_details', pId], () => getPostDetails({ id: pId }), {
        enabled: pId !== undefined
    })

    if (isLoading) return (
        <CommunityLayout>
            <PlaceholderPostCard />
        </CommunityLayout>
    )

    if (isError) return (
        <CommunityLayout>
            <FetchError />
        </CommunityLayout>
    )

    return (
        <CommunityLayout>
            {data && <PostDetails {...data.data} />}
        </CommunityLayout>
    );
}
