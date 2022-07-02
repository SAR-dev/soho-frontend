import { createStyles, Text } from "@mantine/core";
import { RiRestTimeFill } from "react-icons/ri";
import { PollItems } from "./layers/PollItems";
import { HtmlRenderer } from "./layers/HtmlRenderer";
import { Author } from "./layers/Author";
import { PostHeader } from "./layers/PostHeader";
import { PostFooter } from "./layers/PostFooter";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PostDataParam } from "@interfaces/post";
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
  wFull: {
    width: "100%"
  }
}));

dayjs.extend(relativeTime)

export function PollPostCard({ ...props }: PostDataParam) {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Author />
      <div className={classes.wFull}>
        <PostHeader name={`${props.author.first_name} ${props.author.last_name}`} image={props.author.avatar} temp={props.num_vote_up} postedAt={dayjs(props.created_at).fromNow()} />
        {props.content && (
          <HtmlRenderer body={props.content} id={props.id} />
        )}
        {props.choices && (
          <>
            <PollItems {...props} />
            <div className={cx(classes.flex, classes.expire)}>
              {checkIfExpired({duration: props.duration, created_at: props.created_at}) && (
                <>
                  <RiRestTimeFill size={14} />
                  <Text size="xs" ml={5}>

                    Voting expired {dayjs(props.created_at).fromNow()}
                  </Text>
                </>
              )}
            </div>
          </>
        )}
        <PostFooter {...props} />
      </div>
    </div>
  );
}
