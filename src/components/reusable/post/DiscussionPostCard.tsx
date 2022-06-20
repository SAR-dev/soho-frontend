import {
  createStyles,
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

export function DiscussionPostCard({ ...props }: PostDataParam) {
  const { classes } = useStyles();
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    setImages(props.images?.map(x => x.image))
  }, [])


  return (
    <div className={classes.wrapper}>
      <Author />
      <div>
        <PostHeader name={`${props.author.first_name} ${props.author.last_name}`} image={props.author.avatar} temp={props.num_vote_up} postedAt={dayjs(props.created_at).fromNow()} />
        <HtmlRenderer body={props.content} id={props.id} />
        {images.length !== 0 && (
          <ImageCarousel sources={images} />
        )}
        <PostFooter />
      </div>
    </div>
  );
}
