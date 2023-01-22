import { PostDataParam } from "@interfaces/post";
import {
  Text,
  Center,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useState } from "react";
import { MdWavingHand } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { doubleDigit, getPostKey, parseErrors, votePost } from "src/helpers";
import { X } from "tabler-icons-react";
import { ClapIcon } from "@reusable/ClapIcon";
import Lottie from 'react-lottie-player'
import animationData from 'src/animations/88219-upvote-splash-animation.json'
import CountUp from "react-countup";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    position: "relative",
  },
  animation: {
    position: "absolute",
    top: 0,
    marginTop: -100
  },
  countW: {
    width: 22
  }
}));


interface DataParam {
  data: PostDataParam
}

export function PostClapCount({ postId, clapCount }: { postId: number, clapCount: number }) {
  const { classes, cx } = useStyles();
  const notifications = useNotifications();
  const queryClient = useQueryClient()
  const params = useParams()
  const [start, setStart] = useState(0)

  const [loading, setLoading] = useState(false)
  const [play, setPlay] = useState(false)

  const submit = () => {
    setLoading(true)
    votePost(postId).then(res => {
      if (res.error) {
        setLoading(false)
        notifications.showNotification({
          title: "Error adding claps!",
          message: parseErrors(res.error)[0],
          color: "red",
          icon: <X size={18} />,
        });
      } else {
        setLoading(false)
        setStart(clapCount)
        setPlay(true)
        if (params.pId) {
          const pId = params.pId
          const oldData: any = queryClient.getQueryData<DataParam>(['post_details', pId])
          const newData = oldData
          newData.data.num_vote_up = res.data.count
          queryClient.setQueryData(['post_details', pId], { ...newData })
        } else {
          const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
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
    <Center className={classes.wrapper}>
      <ActionIcon variant="transparent" loading={loading} onClick={() => submit()}>
        <ClapIcon size={16} name="wave" />
      </ActionIcon>
      <Text size="sm" weight={500} className={classes.countW} style={{ marginLeft: 2 }}>
        <CountUp start={start} end={clapCount} />
      </Text>
      {play && (
        <div className={classes.animation}>
          <Lottie
            loop={false}
            animationData={animationData}
            play
            style={{ width: 150, height: 150 }}
            onComplete={() => setPlay(false)}
          />
        </div>
      )}
    </Center>
  );
}
