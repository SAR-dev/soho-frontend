import { Modal, Group, Stack, Button, LoadingOverlay, Text } from "@mantine/core";
import { useState } from "react";
import { PostDataParam } from "@interfaces/post";
import { deletePost, draftPost, getPostKey, parseErrors } from "src/helpers";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { Trash, X } from "tabler-icons-react";
import { useNavigate, useParams } from "react-router-dom";


interface UpdateContentModalParam {
    opened: boolean;
    setOpened: (params: boolean) => void;
    id: number;
}

interface DataParam {
    data: PostDataParam
}

export function PostDeleteModal({ ...props }: UpdateContentModalParam) {
    const navigate = useNavigate();
    const notifications = useNotifications();
    const queryClient = useQueryClient()
    const params = useParams()

    const [loading, setLoading] = useState(false)

    const remove = () => {
        setLoading(true)
        deletePost(props.id).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error drafting post!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                if (params.pId) {
                    const pId = params.pId
                    queryClient.removeQueries(['post_details', pId])
                    navigate(-1)
                } else {
                    const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
                    const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
                    const newData = oldData
                    const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === props.id)
                    newData.data.results.splice(postIndex, 1)
                    queryClient.setQueryData([...queryKey], { ...newData })
                }
                props.setOpened(false)
            }
        })
    }

    const draft = () => {
        setLoading(true)
        draftPost(props.id).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error drafting post!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                if (params.pId) {
                    const pId = params.pId
                    queryClient.removeQueries(['post_details', pId])
                    navigate(-1)
                } else {
                    const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
                    const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
                    const newData = oldData
                    const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === props.id)
                    newData.data.results.splice(postIndex, 1)
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
            title="Delete Post"
        >
            <Stack style={{ width: 400 }}>
                <div>
                    <Text color="red">Are you sure you want to delete this post ? This can not be undone.</Text>
                    <Text color="dimmed" size="sm" mt="sm">You can also mask this as draft. So that you can restore it later.</Text>
                </div>
                <Group>
                    <Button size="xs" ml="auto" color="gray" onClick={() => props.setOpened(false)}>
                        Close
                    </Button>
                    <Button size="xs" onClick={() => draft()} color="orange">
                        Mark as Draft
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
