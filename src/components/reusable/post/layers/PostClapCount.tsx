import { PostDataParam } from "@interfaces/post";
import {
  Text,
  Center,
  ActionIcon,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useState } from "react";
import { MdWavingHand } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { doubleDigit, getPostKey, parseErrors, votePost } from "src/helpers";
import { X } from "tabler-icons-react";

interface DataParam {
  data: PostDataParam
}

export function PostClapCount({ postId, clapCount }: { postId: number, clapCount: number }) {
  const notifications = useNotifications();
  const queryClient = useQueryClient()
  const params = useParams()

  const [loading, setLoading] = useState(false)

  const submit = () => {
    setLoading(true)
    votePost(postId).then(res => {
      if (res.error) {
        setLoading(false)
        notifications.showNotification({
          title: "Error creating the comment!",
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
          newData.data.num_vote_up = res.data.count
          queryClient.setQueryData(['post_details', pId], { ...newData })
        } else {
          const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? null : params[Object.keys(params)[1]]]
          const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
          const newData = oldData
          const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === postId)
          newData.data.results[postIndex].num_vote_up = res.data.count
          queryClient.setQueryData([...queryKey], { ...newData })
        }
      }
    })
  }
  return (
    <Center>
      <ActionIcon variant="transparent" loading={loading} onClick={() => submit()}>
        <MdWavingHand size={16} className="wave" />
      </ActionIcon>
      <Text size="sm" weight={500} style={{ marginLeft: 2 }}>
        {doubleDigit(clapCount)}
      </Text>
    </Center>
  );
}
