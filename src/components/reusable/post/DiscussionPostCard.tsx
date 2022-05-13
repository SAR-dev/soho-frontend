import {
  createStyles,
} from "@mantine/core";
import { ImageCarousel } from "./layers/ImageCarousel";
import { HtmlRenderer } from "./layers/HtmlRenderer";
import { Author } from "./layers/Author";
import { PostHeader } from "./layers/PostHeader";
import { PostFooter } from "./layers/PostFooter";

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

interface DiscussionPostProps {
  postedAt: string;
  body: string;
  temp: string;
  author: {
    name: string;
    image: string;
  };
}

export function DiscussionPostCard({
  postedAt,
  body,
  author,
  temp,
}: DiscussionPostProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Author />
      <div>
        <PostHeader author={author} temp={temp} postedAt={postedAt} />
        <HtmlRenderer body={body} />
        <ImageCarousel />
        <PostFooter />
      </div>
    </div>
  );
}
