import {
  createStyles,
} from "@mantine/core";
import { ImageCarousel } from "./layers/ImageCarousel";
import { PollItems } from "./layers/PollItems";
import { HtmlRenderer } from "./layers/HtmlRenderer";
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

interface AmaPostCardProps {
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
}: AmaPostCardProps) {
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
