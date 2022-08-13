import { Modal, Group, Stack, Button, LoadingOverlay, Text } from "@mantine/core";
import { useState } from "react";
import { deleteComment, parseErrors } from "src/helpers";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { Trash, X } from "tabler-icons-react";
import { CommentDataParam } from "@interfaces/comment";


interface CommentDeleteModalParam {
    opened: boolean;
    setOpened: (params: boolean) => void;
    id: number;
    postId: number;
    hasChildren: boolean;
}

export interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: CommentDataParam[];
    }
}

export function CommentDeleteModal({ ...props }: CommentDeleteModalParam) {
    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const [loading, setLoading] = useState(false)

    const remove = () => {
        setLoading(true)
        deleteComment(props.id).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error deleting comment!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                const oldData: any = queryClient.getQueryData<DataParam>(['comments', props.postId.toString()])
                const newData = oldData
                const commentIndex = newData.data.results.findIndex((e: { id: number }) => e.id === props.id)
                if(props.hasChildren){
                    newData.data.results[commentIndex].content = "This comment has been removed"
                    newData.data.results[commentIndex].is_active = false
                } else {
                    newData.data.results.splice(commentIndex, 1)
                }
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
            title="Delete Comment"
        >
            <Stack style={{ width: 400 }}>
                <Text color="red">Are you sure you want to delete this comment ? This can not be undone.</Text>
                <Group>
                    <Button size="xs" ml="auto" color="gray" onClick={() => props.setOpened(false)}>
                        Close
                    </Button>
                    <Button size="xs" leftIcon={<Trash size={16} />} onClick={() => remove()} color="red">
                        Delete
                    </Button>
                </Group>
                <LoadingOverlay visible={loading} />
            </Stack>
        </Modal>
    );
}
