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

export interface DataParam {
  id: number;
  status: string;
  content: string;
  images: Image[];
  link: null;
  category: Category;
  sub_category: Category;
  release_time: null;
  duration: null;
  thumbnail: null;
  is_blur: boolean;
  post_type: string;
  can_vote: boolean;
  can_comment: boolean;
  author: Author;
  group: Group;
  choices: any[];
  choices_voted: boolean;
  num_vote_up: number;
  bookmarks_count: number;
  bookmarked: boolean;
  upvoted: boolean;
  comments_count: number;
  available_awards: any[];
  awards: Awards;
  created_at: Date;
  updated_at: Date;
}

export interface Author {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  avatar: string;
}

export interface Awards {
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  color?: string;
}

export interface Group {
  id: number;
  status: string;
  author: Author;
  subscribers_count: number;
  subscribed: boolean;
  post_count: number;
  is_admin: boolean;
  is_moderator: boolean;
}

export interface Image {
  id: number;
  image: string;
  height: number;
  width: number;
  description: string;
  author: Author;
}

dayjs.extend(relativeTime)

export function DiscussionPostCard({ ...props }: DataParam) {
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
