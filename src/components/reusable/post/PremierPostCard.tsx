import {
  Text,
  createStyles,
  Image,
  Group,
  Avatar,
  Button,
  Stack,
} from "@mantine/core";
import { ImageCarousel } from "./layers/ImageCarousel";
import { HtmlRenderer } from "./layers/HtmlRenderer";
import { Author } from "./layers/Author";
import { PostHeader } from "./layers/PostHeader";
import { PostFooter } from "./layers/PostFooter";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { PostDataParam } from "@interfaces/post";
import { AlertCircle, BellRinging, Check, InfoCircle, LivePhoto, X } from "tabler-icons-react";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { bookmarkPost, doubleDigit, getPostKey, parseErrors, unBookmarkPost } from "src/helpers";

const useStyles = createStyles((theme, _params, getRef) => ({
  cover: {
    overflow: 'hidden',
    backgroundColor: theme.colors.blue[5]
  },
  wrapper: {
    position: "relative",
    padding: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    display: "flex",
    transitionDuration: '.5s',
    msTransitionTimingFunction: "cubic-bezier(.32,.68,.98,.24)",

    '&:hover': {
      transform: "translateX(15px)"
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  announcement: {
    color: theme.colors.blue[3]
  },
  wFull: {
    width: "100%"
  },
  notification: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
        : theme.colors[theme.primaryColor][1],
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
  },
}));

dayjs.extend(relativeTime)

interface DataParam {
  data: PostDataParam
}

export function PremierPostCard({ ...props }: PostDataParam) {
  const { classes, cx } = useStyles();
  const [loading, setLoading] = useState(false)
  const [marking, setMarking] = useState(false)
  const notifications = useNotifications();
  const queryClient = useQueryClient()
  const params = useParams()

  const bookmark = () => {
    const postId = props.id
    setMarking(true)
    bookmarkPost(postId).then(res => {
      if (res.error) {
        setMarking(false)
        notifications.showNotification({
          title: "Error subscribing alert!",
          message: parseErrors(res.error)[0],
          color: "red",
          icon: <X size={18} />,
        });
      } else {
        notifications.showNotification({
          title: "Alert subscribed",
          message: "Your have subscribed to alert for this post.",
          color: "teal",
          icon: <Check size={18} />,
          autoClose: 5000,
        });
        setMarking(false)
        if (params.pId) {
          const pId = params.pId
          const oldData: any = queryClient.getQueryData<DataParam>(['post_details', pId])
          const newData = oldData
          newData.data.bookmarked = res.data.bookmarked
          newData.data.bookmarks_count = res.data.count
          queryClient.setQueryData(['post_details', pId], { ...newData })
        } else {
          const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
          const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
          const newData = oldData
          const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === postId)
          newData.data.results[postIndex].bookmarked = res.data.bookmarked
          newData.data.results[postIndex].bookmarks_count = res.data.count
          queryClient.setQueryData([...queryKey], { ...newData })
        }
      }
    })
  }

  const unbookmark = () => {
    const postId = props.id
    setMarking(true)
    unBookmarkPost(postId).then(res => {
      if (res.error) {
        setMarking(false)
        notifications.showNotification({
          title: "Error unsubscribing alert!",
          message: parseErrors(res.error)[0],
          color: "red",
          icon: <X size={18} />,
        });
      } else {
        notifications.showNotification({
          title: "Alert unsubscribed",
          message: "Your have unsubscribed to alert for this post.",
          color: "teal",
          icon: <Check size={18} />,
          autoClose: 5000,
        });
        setMarking(false)
        if (params.pId) {
          const pId = params.pId
          const oldData: any = queryClient.getQueryData<DataParam>(['post_details', pId])
          const newData = oldData
          newData.data.bookmarked = res.data.bookmarked
          newData.data.bookmarks_count = res.data.count
          queryClient.setQueryData(['post_details', pId], { ...newData })
        } else {
          const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
          const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
          const newData = oldData
          const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === postId)
          newData.data.results[postIndex].bookmarked = res.data.bookmarked
          newData.data.results[postIndex].bookmarks_count = res.data.count
          queryClient.setQueryData([...queryKey], { ...newData })
        }
      }
    })
  }


  return (
    <div className={classes.cover}>
      <div className={classes.wrapper}>
        <div className={classes.wFull}>
          <Image my="sm" src={props.thumbnail?.image} height={350} width="100%" fit="cover" withPlaceholder />
          <div className={classes.flex}>
            <Group spacing="xs" className={classes.wFull}>
              <Avatar src={props.author.avatar} radius="xl" size={35} />
              <Stack spacing={0}>
                <Text size="sm" weight={700}>
                  {`${props.author.first_name} ${props.author.last_name}`}
                </Text>
                <div className={classes.flex}>
                  <LivePhoto className="rotate" color="yellow" size={18} />
                  <Text size="xs" color="yellow" mx={5}>Premiering at {dayjs(props.release_time).format('MMM DD  hh:mm A')}</Text>
                  <Text size="xs" color="dimmed">{doubleDigit(props.bookmarks_count)} waiting</Text>
                </div>
              </Stack>
              <Stack spacing={0} ml="auto">
                <Button size="xs" className={classes.notification} loading={marking} onClick={props.bookmarked ? unbookmark : bookmark} >
                  Turn Reminder <BellRinging size={14} style={{ marginLeft: 5, marginRight: 5 }} /> {props.bookmarked ? "Off" : "On"}
                </Button>
              </Stack>
            </Group>
          </div>
        </div>
      </div>
    </div>
  );
}
