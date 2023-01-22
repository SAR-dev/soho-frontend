import { useState } from "react";
import { createStyles, Group, Button, Text, Stack, LoadingOverlay } from "@mantine/core";
import { Author } from "../post/layers/Author";
import { Check, InfoCircle, Send, X } from "tabler-icons-react";
import { createComment, parseErrors } from "../../../helpers";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { AuthorDataParam } from "@interfaces/author";
import { MdClose } from "react-icons/md";
import { Ctiptap } from "src/components/ctiptap";
import { LimitCounter } from "src/components/ctiptap/LimitCounter";

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        position: "relative",
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        display: "flex",
    },
    editorWrapper: {
        width: "100%",
        fontSize: theme.fontSizes.sm
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

const textLimit = 1000

export function CreateComment({ postId, author }: { postId: number, author: AuthorDataParam }) {
    const { classes } = useStyles();
    const notifications = useNotifications();
    const [show, setShow] = useState(false)
    const queryClient = useQueryClient()

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false)

    const submit = () => {
        setLoading(true)
        createComment({ postId: postId, content: text }).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error creating the comment!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                notifications.showNotification({
                    title: "Comment Submitted",
                    message: "Your comment has been submitted. Please wait for a while for your post to appear in your feed.",
                    color: "teal",
                    icon: <Check size={18} />,
                    autoClose: 5000,
                });
                setLoading(false)
                setText("")
                queryClient.invalidateQueries(["comments", postId])
                setShow(false)
            }
        })
    }

    return (
        <div className={classes.wrapper}>
            <Author {...author} />
            <div className={classes.editorWrapper}>
                <Stack className={classes.commentCreatorHeader} spacing={3}>
                    <Group spacing={3}>
                        <Text size="sm">Respond as</Text>
                        <Text color="blue" size="sm" ml={5}>{`${author.first_name} ${author.last_name}`}</Text>
                    </Group>
                </Stack>
                {show ? (
                    <div style={{ position: "relative" }}>
                        <Ctiptap text={text} setText={setText} minimal={true} />
                        <Group>
                            <LimitCounter count={text.length} limit={textLimit} />
                            <Button ml="auto" size="xs" leftIcon={<MdClose size={16} />} onClick={() => setShow(false)} disabled={loading}>
                                Close
                            </Button>
                            <Button size="xs" leftIcon={<Send size={16} />} onClick={() => submit()} loading={loading}>
                                Respond
                            </Button>
                        </Group>
                        <LoadingOverlay visible={loading} />
                    </div>) : (<Button size="xs" fullWidth onClick={() => setShow(true)}>Write a response</Button>)}
            </div>
        </div>
    );
}
