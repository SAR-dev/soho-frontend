import { CommunityLayout } from "../../layouts/CommunityLayout";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../../../helpers";
import { useQuery } from "react-query";
import { PlaceholderPostCard } from "../../reusable/post/PlaceholderPostCard";
import { PostDetails } from "@reusable/post/PostDetails";
import { FetchError } from "../../reusable/FetchError";
import { PostDataParam } from "@interfaces/post";

export interface DataParam {
    data: PostDataParam
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
