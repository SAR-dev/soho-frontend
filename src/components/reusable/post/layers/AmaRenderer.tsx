import { PostDataParam } from "@interfaces/post";
import { createStyles, Text, TextInput, ActionIcon, Center, Stack, Button } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { bookmarkPost, createComment, getPostKey, parseErrors, unBookmarkPost } from "src/helpers";
import { ArrowRight, BellRinging, Check, LivePhoto, X } from "tabler-icons-react";

const useStyles = createStyles((theme, _params, getRef) => ({
  typography: {
    marginTop: theme.spacing.xs,
  },
  askTime: {
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.xs,
  },
  notification: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
        : theme.colors[theme.primaryColor][1],
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
  },
  red: {
    color: theme.colors.red[3]
  }
}));

interface DataParam {
  data: PostDataParam
}

export function AmaRenderer({ body, release_time, postId, expired, bookmarked }: { body: string, release_time: string | null, postId: number, expired: boolean, bookmarked: boolean }) {
  const { classes, cx } = useStyles();
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [marking, setMarking] = useState(false)
  const notifications = useNotifications();
  const queryClient = useQueryClient()
  const params = useParams()

  const submit = () => {
    setLoading(true)
    createComment({ postId: postId, content: content }).then(res => {
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
        setContent("")
        if (params.pId) {
          queryClient.invalidateQueries(["comments", postId])
        } else {
          const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
          const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
          const newData = oldData
          const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === postId)
          newData.data.results[postIndex].comments_count = newData.data.results[postIndex].comments_count + 1
          queryClient.setQueryData([...queryKey], { ...newData })
        }
      }
    })
  }

  const bookmark = () => {
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
    <Stack spacing="sm" className={classes.typography}>
      <Text size="sm">{body}</Text>
      <Center inline style={{ justifyContent: "start" }}>
        {/* {expired ? (
          <>
            <LivePhoto className={classes.red} size={18} />
            <Text size="xs" color="red" weight={700} className={cx(classes.askTime, classes.red)}>
              Live Ended - {dayjs(release_time).format('MMM DD  hh:mm A')}
            </Text>
          </>
        ) : (
          <>
            <LivePhoto className="rotate" color="yellow" size={18} />
            <Text size="xs" color="yellow" weight={700} className={classes.askTime}>
              Live - {dayjs(release_time).format('MMM DD  hh:mm A')}
            </Text>
          </>
        )} */}
        {!expired && (
          <>
            <LivePhoto className="rotate" color="yellow" size={18} />
            <Text size="xs" color="yellow" weight={700} className={classes.askTime}>
              Live - {dayjs(release_time).format('MMM DD  hh:mm A')}
            </Text>
          </>
        )}

        {!expired && (
          <Button size="xs" compact className={classes.notification} loading={marking} onClick={bookmarked ? unbookmark : bookmark} >
            Turn <BellRinging size={14} style={{ marginLeft: 5, marginRight: 5 }} /> {bookmarked ? "Off" : "On"}
          </Button>
        )}
      </Center>
      <TextInput
        radius={18}
        size="xs"
        rightSection={
          <ActionIcon size={25} radius="xl" color="blue" variant="light" loading={loading} onClick={() => submit()}>
            <ArrowRight size={18} />
          </ActionIcon>
        }
        placeholder="Ask question here..."
        rightSectionWidth={30}
        className="thick-border"
        value={content}
        onChange={e => setContent(e.target.value)}
        disabled={loading}
      />
    </Stack>
  );
}
