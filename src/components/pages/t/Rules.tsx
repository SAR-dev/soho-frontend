import { CommunityLayout } from "../../layouts/CommunityLayout";
import { useParams } from "react-router-dom";
import { getCommunityRules, getPostDetails, parseErrors, uniqueId, updateCommunityRules } from "../../../helpers";
import { useQuery, useQueryClient } from "react-query";
import { PlaceholderPostCard } from "../../reusable/post/PlaceholderPostCard";
import { PostDetails } from "@reusable/post/PostDetails";
import { FetchError } from "../../reusable/FetchError";
import { PostDataParam } from "@interfaces/post";
import { Button, createStyles, Group, LoadingOverlay, Stack, Text, ThemeIcon } from "@mantine/core";
import { HtmlRenderer } from "@reusable/post/layers/HtmlRenderer";
import { RulesDataParam } from "@interfaces/rules";
import { Check, CircleCheck, Plus, Upload } from "tabler-icons-react";
import { Ctiptap } from "src/components/ctiptap";
import { useState } from "react";
import { LimitCounter } from "src/components/ctiptap/LimitCounter";
import { ErrorMessage } from "@reusable/ErrorMessage";
import { useNotifications } from "@mantine/notifications";

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
    data: RulesDataParam
}

const textLimit = 1000

export function Rules() {
    const { classes } = useStyles();
    const { author } = useParams<"author">();
    const notifications = useNotifications();
    const queryClient = useQueryClient()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")
    const [errors, setErrors] = useState<string[]>([])

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

    const submit = () => {
        setLoading(true)
        setErrors([])
        const updatedData = { rules: text }
        updateCommunityRules({ username: author, data: updatedData }).then(res => {
            if (res.error) {
                setErrors(parseErrors(res.error))
                setLoading(false)
            } else {
                notifications.showNotification({
                    title: "Rules Updated",
                    message: "Please wait for a while to see changes.",
                    color: "teal",
                    icon: <Check size={18} />,
                    autoClose: 5000,
                });
                queryClient.invalidateQueries(["rules", author])
                setText("")
                setLoading(false)
                setShow(false)
            }
        })
    }

    return (
        <CommunityLayout>
            <Stack className={classes.card}>
                <Group>
                    <Text size="lg" weight={500} className={classes.title}>
                        Community rules
                    </Text>
                    {data?.data.is_admin && (
                        <Button ml="auto" size="xs" leftIcon={<Upload size={14} />} onClick={() => setShow(true)}>Update Rules</Button>
                    )}
                </Group>
                {data && data.data.rules.length < 10 && (
                    <Text>There is no rules given by the admin here.</Text>
                )}
                {show ? (
                    <div style={{ position: 'relative' }}>
                        <Text size="sm" mb="sm">Add Community Rule</Text>
                        <Ctiptap text={text} setText={setText} limit={textLimit} minimal={true} />
                        <Group spacing="xs">
                            <LimitCounter count={text.length} limit={textLimit} />
                            <Button loading={loading} ml="auto" size="xs" color="gray" onClick={() => setShow(false)}>Close</Button>
                            <Button loading={loading} size="xs" onClick={() => submit()}>Update Rules</Button>
                        </Group>
                        <ErrorMessage errors={errors} />
                        <LoadingOverlay visible={loading} />
                    </div>
                ) : (
                    <div className="markdown-body-dark">
                        {(data && data.data.rules.length >= 10) && <HtmlRenderer body={data.data.rules} id={9999} />}
                    </div>
                )}
            </Stack>
        </CommunityLayout>
    );
}
