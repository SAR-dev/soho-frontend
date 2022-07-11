import {
  Text,
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
import { AlertCircle, InfoCircle } from "tabler-icons-react";

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
    transitionDuration: '.5s',
    msTransitionTimingFunction: "cubic-bezier(.32,.68,.98,.24)",

    '&:hover': {
      transform: "translateX(15px)"
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  announcement: {
    color: theme.colors.blue[3]
  }
}));

dayjs.extend(relativeTime)

export function DiscussionPostCard({ ...props }: PostDataParam) {
  const { classes, cx } = useStyles();
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    setImages(props.images?.map(x => x.image))
  }, [])


  return (
    <div className={classes.cover}>
      <div className={classes.wrapper}>
        <Author {...props.author} />
        <div>
          <PostHeader name={`${props.author.first_name} ${props.author.last_name}`} image={props.author.avatar} temp={props.num_vote_up} postedAt={dayjs(props.created_at).fromNow()} />
          {props.content && (
            <HtmlRenderer body={props.content} id={props.id} />
          )}
          {images.length !== 0 && (
            <ImageCarousel sources={images} />
          )}
          {props.post_type === "announcement" ? (
            <div className={cx(classes.flex, classes.announcement)}>
              <InfoCircle size={14} />
              <Text size="sm" ml={5}>
                You can neither comment nor react in announcement post.
              </Text>
            </div>
          ) : (
            <PostFooter {...props} />
          )}

        </div>
      </div>
    </div>
  );
}
