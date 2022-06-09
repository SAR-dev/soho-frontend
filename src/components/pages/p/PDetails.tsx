import { createStyles, SimpleGrid, Skeleton } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { EditorCreator } from "../../editors/EditorCreator";
import { EditorWrapper } from "../../editors/EditorWrapper";
import { AmaPostCard } from "../../reusable/post/AmaPostCard";
import { DiscussionPostCard } from "../../reusable/post/DiscussionPostCard";
import { PollPostCard } from "../../reusable/post/PollPostCard";
import { CommunityLayout } from "../../layouts/CommunityLayout";
import { useParams } from "react-router-dom";
import { getPostDetails, getPostsFromType } from "../../../helpers";
import { useQuery } from "react-query";
import { useState } from "react";
import { PlaceholderPostCard } from "../../reusable/post/PlaceholderPostCard";
import { PostDetails } from "../../reusable/post/PostDetails";

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
    data: Result
}

export interface Result {
    id:               number;
    status:           string;
    content:          string;
    images:           any[];
    link:             null;
    category:         Category;
    sub_category:     Category;
    release_time:     null;
    duration:         null;
    thumbnail:        null;
    is_blur:          boolean;
    post_type:        string;
    pinned_comment:   null;
    can_vote:         boolean;
    can_comment:      boolean;
    author:           Author;
    group:            Group;
    choices:          any[];
    choices_voted:    boolean;
    num_vote_up:      number;
    bookmarks_count:  number;
    bookmarked:       boolean;
    upvoted:          boolean;
    comments_count:   number;
    available_awards: any[];
    awards:           Awards;
    created_at:       Date;
    updated_at:       Date;
}

export interface Author {
    id:         number;
    username:   string;
    first_name: string;
    last_name:  string;
    is_active:  boolean;
    avatar:     string;
}

export interface Awards {
}

export interface Category {
    id:     number;
    name:   string;
    slug:   string;
    color?: string;
}

export interface Group {
    id:                number;
    status:            string;
    author:            Author;
    subscribers_count: number;
    subscribed:        boolean;
    post_count:        number;
    is_admin:          boolean;
    is_moderator:      boolean;
}

export function PDetails() {
    const { classes, cx } = useStyles();

    const { pId } = useParams<"pId">();
    const [post, setPost] = useState<DataParam>()

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['post_details', pId], () => getPostDetails({ id: pId }), {
        enabled: pId !== undefined,
    })

    return (
        <CommunityLayout>
            {isLoading && <PlaceholderPostCard />}
            {data && <PostDetails {...data.data} />}
        </CommunityLayout>
    );
}
