import {
  createStyles, Text,
} from "@mantine/core";
import { Author } from "./layers/Author";
import { PostHeader } from "./layers/PostHeader";
import { PostFooter } from "./layers/PostFooter";
import { AmaRenderer } from "./layers/AmaRenderer";
import { PostDataParam } from "@interfaces/post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { RiRestTimeFill } from "react-icons/ri";
import { checkIfExpired, timeLengthToSeconds } from "src/helpers";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    position: "relative",
    padding: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    display: "flex",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  expire: {
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.sm,
    color: theme.colors.red[3],
  },
}));

dayjs.extend(relativeTime)

export function AmaPostCard({ ...props }: PostDataParam) {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Author />
      <div>
        <PostHeader name={`${props.author.first_name} ${props.author.last_name}`} image={props.author.avatar} temp={props.num_vote_up} postedAt={dayjs(props.created_at).fromNow()} />
        {props.content && (
          <AmaRenderer body={props.content} release_time={props.release_time} postId={props.id} expired={checkIfExpired({duration: props.duration, created_at: props.created_at})} />
        )}
        <div className={cx(classes.flex, classes.expire)}>
          {checkIfExpired({duration: props.duration, created_at: props.created_at}) && (
            <>
              <RiRestTimeFill size={14} />
              <Text size="xs" ml={5}>

                Asking author has expired {dayjs(props.created_at).fromNow()}
              </Text>
            </>
          )}
        </div>
        <PostFooter {...props} />
      </div>
    </div>
  );
}
