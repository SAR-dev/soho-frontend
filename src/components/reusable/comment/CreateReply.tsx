import { useState } from "react";
import { createStyles, Group, Button, Text, Stack, Avatar, LoadingOverlay } from "@mantine/core";
import { Check, X } from "tabler-icons-react";
import { createReply, parseErrors } from "../../../helpers";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { CommentDataParam } from "@interfaces/comment";
import { MdClose, MdReply } from "react-icons/md";
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
    },
    rwrapper: {
        position: 'relative',
        [`&:hover .reply-menus`]: {
            display: 'flex'
        },
    },
    avatar: {
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[3],
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[4],
    },
}));

const textLimit = 1000

export function CreateReply({ comment, setShow, postId }: { comment: CommentDataParam, setShow: (params: boolean) => void, postId: number }) {
    const { classes } = useStyles();
    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false)

    const submit = () => {
        setLoading(true)
        createReply({ postId: postId, commentId: comment.id, content: text }).then(res => {
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
                queryClient.invalidateQueries(["comments", comment.id])
                setShow(false)
            }
        })
    }

    return (
        <Stack spacing={8} className={classes.rwrapper}>
            <Group spacing="xs">
                <Avatar
                    size={20}
                    src={comment.author.avatar}
                    radius={20}
                    className={classes.avatar}
                />
                <Group spacing={3}>
                    <Text size="sm">Reply as</Text>
                    <Text color="blue" size="sm" ml={5}>{`${comment.author.first_name} ${comment.author.last_name}`}</Text>
                </Group>
            </Group>
            <Stack spacing={8} style={{ position: "relative" }}>
                <Ctiptap text={text} setText={setText} minimal={true} />
                <Group>
                    <LimitCounter count={text.length} limit={textLimit} />
                    <Button size="xs" ml="auto" leftIcon={<MdClose size={16} />} onClick={() => setShow(false)} disabled={loading}>
                        Close
                    </Button>
                    <Button size="xs" leftIcon={<MdReply size={16} />} onClick={() => submit()} loading={loading}>
                        Whisper
                    </Button>
                </Group>
                <LoadingOverlay visible={loading} />
            </Stack>
        </Stack>
    );
}
