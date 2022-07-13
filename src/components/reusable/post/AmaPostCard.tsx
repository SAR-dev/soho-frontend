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
  const temperature = parseFloat(Math.pow((props.num_vote_up * 1.25 + props.comments_count * .85), .3).toFixed(2))

  return (
    <div className={classes.cover}>
      <div className={classes.wrapper}>
        <Author {...props.author} />
        <div>
          <PostHeader name={`${props.author.first_name} ${props.author.last_name}`} image={props.author.avatar} temp={temperature} postedAt={dayjs(props.created_at).fromNow()} />
          {props.content && (
            <AmaRenderer body={props.content} release_time={props.release_time} postId={props.id} expired={checkIfExpired({ duration: props.duration, created_at: props.created_at })} bookmarked={props.bookmarked} />
          )}
          <div className={cx(classes.flex, classes.expire)}>
            {checkIfExpired({ duration: props.duration, created_at: props.created_at }) && (
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
    </div>
  );
}
