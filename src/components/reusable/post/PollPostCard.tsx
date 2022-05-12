import {
  createStyles,
} from "@mantine/core";
import { ImageCarousel } from "./layers/ImageCarousel";
import { PollItems } from "./layers/PollItems";
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

interface PollPostCardProps {
  postedAt: string;
  body: string;
  temp: string;
  author: {
    name: string;
    image: string;
  };
}

export function PollPostCard({
  postedAt,
  body,
  author,
  temp,
}: PollPostCardProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Author />
      <div>
        <PostHeader author={author} temp={temp} postedAt={postedAt} />
        <HtmlRenderer body={body} />
        <PollItems />
        <PostFooter />
      </div>
    </div>
  );
}
