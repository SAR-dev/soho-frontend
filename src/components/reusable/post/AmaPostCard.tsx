import {
  createStyles,
} from "@mantine/core";
import { Author } from "./layers/Author";
import { PostHeader } from "./layers/PostHeader";
import { PostFooter } from "./layers/PostFooter";
import { AmaRenderer } from "./layers/AmaRenderer";
import { PostDataParam } from "@interfaces/post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    position: "relative",
    padding: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    display: "flex",
  }
}));

dayjs.extend(relativeTime)

export function AmaPostCard({ ...props }: PostDataParam) {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Author />
      <div>
        <PostHeader name={`${props.author.first_name} ${props.author.last_name}`} image={props.author.avatar} temp={props.num_vote_up} postedAt={dayjs(props.created_at).fromNow()} />
        {props.content && (
        <AmaRenderer body={props.content} release_time={props.release_time} />
        )}
        <PostFooter />
      </div>
    </div>
  );
}
