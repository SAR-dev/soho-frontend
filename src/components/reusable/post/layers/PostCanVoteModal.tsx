import { Modal, Group, Stack, Button, LoadingOverlay, Text } from "@mantine/core";
import { useState } from "react";
import { PostDataParam } from "@interfaces/post";
import { deletePost, draftPost, getPostKey, parseErrors, turnOffCommenting, turnOffVoting, turnOnCommenting, turnOnVoting } from "src/helpers";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { Trash, X } from "tabler-icons-react";
import { useNavigate, useParams } from "react-router-dom";


interface PostCanVoteModalParam {
    opened: boolean;
    setOpened: (params: boolean) => void;
    id: number;
    can_vote: boolean;
}

interface DataParam {
    data: PostDataParam
}

export function PostCanVoteModal({ ...props }: PostCanVoteModalParam) {
    const notifications = useNotifications();
    const queryClient = useQueryClient()
    const params = useParams()

    const [loading, setLoading] = useState(false)

    const turnOnCanVote = () => {
        setLoading(true)
        turnOnVoting(props.id).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error turning on reactions!",
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
                    newData.data.can_vote = res.data.can_vote
                    queryClient.setQueryData(['post_details', pId], { ...newData })
                } else {
                    const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
                    const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
                    const newData = oldData
                    const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === props.id)
                    newData.data.results[postIndex].can_vote = res.data.can_vote
                    queryClient.setQueryData([...queryKey], { ...newData })
                }
                props.setOpened(false)
            }
        })
    }

    const turnOffCanVote = () => {
        setLoading(true)
        turnOffVoting(props.id).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error turning off reactions!",
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
                    newData.data.can_vote = res.data.can_vote
                    queryClient.setQueryData(['post_details', pId], { ...newData })
                } else {
                    const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
                    const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
                    const newData = oldData
                    const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === props.id)
                    newData.data.results[postIndex].can_vote = res.data.can_vote
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
            title="Toogle Reactions"
        >
            <Stack style={{ width: 400 }}>
                <div>
                    <Text>Are you sure you want to <b>{props.can_vote ? "TURN OFF" : "TURN ON"}</b> reactions on this post ? This can be changed anytime.</Text>
                </div>
                <Group>
                    <Button size="xs" ml="auto" color="gray" onClick={() => props.setOpened(false)}>
                        Close
                    </Button>
                    {props.can_vote ? (
                        <Button size="xs" onClick={() => turnOffCanVote()}>
                            Turn Off Reactions
                        </Button>
                    ) : (
                        <Button size="xs" onClick={() => turnOnCanVote()}>
                            Turn On Reactions
                        </Button>
                    )}
                </Group>
                <LoadingOverlay visible={loading} />
            </Stack>
        </Modal>
    );
}
