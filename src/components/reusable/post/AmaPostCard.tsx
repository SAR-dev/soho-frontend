import {
  createStyles,
} from "@mantine/core";
import { Author } from "./layers/Author";
import { PostHeader } from "./layers/PostHeader";
import { PostFooter } from "./layers/PostFooter";
import { AmaRenderer } from "./layers/AmaRenderer";

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

interface Props {
  postedAt: string;
  body: string;
  temp: string;
  author: {
    name: string;
    image: string;
  };
}

export function AmaPostCard({
  postedAt,
  body,
  author,
  temp,
}: Props) {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Author />
      <div>
        <PostHeader author={author} temp={temp} postedAt={postedAt} />
        <AmaRenderer body={body} />
        <PostFooter />
      </div>
    </div>
  );
}
