import { Modal, Group, Stack, Button, LoadingOverlay, Textarea, createStyles } from "@mantine/core";
import { useState } from "react";
import { PostDataParam } from "@interfaces/post";
import { AiOutlineReload } from "react-icons/ai";
import { Ctiptap } from "src/components/ctiptap";
import { LimitCounter } from "src/components/ctiptap/LimitCounter";
import { getPostKey, parseErrors, updatePostContent } from "src/helpers";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { X } from "tabler-icons-react";
import { useParams } from "react-router-dom";
import { EmojiPopover } from "@editors/EmojiPopover";
import insertTextAtCursor from "insert-text-at-cursor";

const useStyles = createStyles((theme) => ({
    editor: {
        width: "100%",
        marginBottom: theme.spacing.sm,
    },
    textArea: {
        ["textarea"]: {
            overflow: 'hidden',
            fontSize: theme.fontSizes.lg,
            "&::-webkit-input-placeholder": {
                fontSize: theme.fontSizes.sm,
            },
        },
    }
}));

const textLimit = 2500

interface UpdateContentModalParam {
    opened: boolean;
    setOpened: (params: boolean) => void;
    content: string | null;
    id: number;
    richText: boolean;
}

interface DataParam {
    data: PostDataParam
}

export function PostContentUpdateModal({ ...props }: UpdateContentModalParam) {
    const { classes, cx } = useStyles();
    const [text, setText] = useState(props.content || '')
    const notifications = useNotifications();
    const queryClient = useQueryClient()
    const params = useParams()

    const [loading, setLoading] = useState(false)

    function isInputElement(elem: HTMLElement | null): elem is HTMLInputElement {
        if (!elem) {
            return false;
        }
        return true;
    }

    const insertText = (text: string) => {
        const el = document.getElementById("emoji-textarea");
        if (isInputElement(el)) {
            insertTextAtCursor(el, text);
        }
    };

    const update = () => {
        setLoading(true)
        const data = { content: text }
        updatePostContent({ id: props.id, data: data }).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error updating post!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                if (params.pId) {
                    const pId = params.pId
                    const oldData: any = queryClient.getQueryData<DataParam>(['post_details', pId])
                    const newData = oldData
                    newData.data.content = res.data.content
                    queryClient.setQueryData(['post_details', pId], { ...newData })
                } else {
                    const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
                    const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
                    const newData = oldData
                    const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === props.id)
                    newData.data.results[postIndex].content = res.data.content
                    queryClient.setQueryData([...queryKey], { ...newData })
                }
                props.setOpened(false)
            }
        })
    }


    return (
        <Modal
            centered
            opened={props.opened}
            onClose={() => props.setOpened(false)}
            title="Update Post"
        >
            <Stack spacing="sm" style={{ position: "relative", minWidth: 700 }}>
                {props.richText ? (
                    <Ctiptap text={text} setText={setText} limit={textLimit} />
                ) : (
                    <Textarea
                        placeholder="Start typing here...."
                        autosize
                        minRows={3}
                        value={text}
                        autoFocus
                        onChange={(event) => setText(event.currentTarget.value)}
                        className={cx(classes.editor, classes.textArea, "thick-border")}
                        id="emoji-textarea"
                    />
                )}

                <Group>
                    {props.richText ? (
                        <LimitCounter count={text.length} limit={textLimit} />
                    ) : (
                        <EmojiPopover insertText={insertText} />
                    )}

                    <Button size="xs" ml="auto" color="gray" onClick={() => props.setOpened(false)}>
                        Close
                    </Button>
                    <Button size="xs" leftIcon={<AiOutlineReload size={16} />} onClick={() => update()}>
                        Update
                    </Button>
                </Group>
                <LoadingOverlay visible={loading} />
            </Stack>
        </Modal>
    );
}
