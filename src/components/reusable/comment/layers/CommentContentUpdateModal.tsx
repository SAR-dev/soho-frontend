import { Modal, Group, Stack, Button, LoadingOverlay, Textarea, createStyles } from "@mantine/core";
import { useState } from "react";
import { PostDataParam } from "@interfaces/post";
import { AiOutlineReload } from "react-icons/ai";
import { Ctiptap } from "src/components/ctiptap";
import { LimitCounter } from "src/components/ctiptap/LimitCounter";
import { getPostKey, parseErrors, updateComment, updatePostContent } from "src/helpers";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { X } from "tabler-icons-react";
import { useParams } from "react-router-dom";
import { EmojiPopover } from "@editors/EmojiPopover";
import insertTextAtCursor from "insert-text-at-cursor";
import { CommentDataParam } from "@interfaces/comment";

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

const textLimit = 1000

interface CommentContentUpdateModalParam {
    opened: boolean;
    setOpened: (params: boolean) => void;
    content: string | null;
    id: number;
    postId: number;
}

export interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: CommentDataParam[];
    }
}

export function CommentContentUpdateModal({ ...props }: CommentContentUpdateModalParam) {
    const [text, setText] = useState(props.content || '')
    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const [loading, setLoading] = useState(false)

    const update = () => {
        setLoading(true)
        const data = { content: text }
        updateComment({ id: props.id, data: data }).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error updating comment!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                const oldData: any = queryClient.getQueryData<DataParam>(['comments', props.postId.toString()])
                const newData = oldData
                const commentIndex = newData.data.results.findIndex((e: { id: number }) => e.id === props.id)
                newData.data.results[commentIndex].content = res.data.content
                queryClient.setQueryData(['comments', props.postId.toString()], { ...newData })
                props.setOpened(false)
            }
        })
    }


    return (
        <Modal
            centered
            opened={props.opened}
            onClose={() => props.setOpened(false)}
            title="Update Comment"
        >
            <Stack spacing="sm" style={{ position: "relative", minWidth: 700 }}>
                <Ctiptap text={text} setText={setText} limit={textLimit} />

                <Group>
                    <LimitCounter count={text.length} limit={textLimit} />

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
