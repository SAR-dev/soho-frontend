import { CommunityLayout } from "../../layouts/CommunityLayout";
import { useParams } from "react-router-dom";
import { getCommunityRules, getPostDetails } from "../../../helpers";
import { useQuery } from "react-query";
import { PlaceholderPostCard } from "../../reusable/post/PlaceholderPostCard";
import { PostDetails } from "@reusable/post/PostDetails";
import { FetchError } from "../../reusable/FetchError";
import { PostDataParam } from "@interfaces/post";
import { createStyles, Stack, Text } from "@mantine/core";
import { HtmlRenderer } from "@reusable/post/layers/HtmlRenderer";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.xl
    },
    title: {
        lineHeight: 1,
    },
}));

interface DataParam {
    data: {
        rules: null | string
    }
}

export function Rules() {
    const { classes } = useStyles();
    const { author } = useParams<"author">();

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['rules', author], () => getCommunityRules({ username: author }))

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
            <Stack className={classes.card}>
                <Text size="lg" weight={500} className={classes.title}>
                    Community rules
                </Text>
                {data?.data.rules === null &&  <Text>There is no rules given by the admin here.</Text>}
                {data?.data && data.data.rules !== null && <HtmlRenderer body={data.data.rules} id={999} />}
            </Stack>
        </CommunityLayout>
    );
}
