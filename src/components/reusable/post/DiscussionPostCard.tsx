import { createStyles, Group } from "@mantine/core";
import { ImageCarousel } from "./layers/ImageCarousel";
import { HtmlRenderer } from "./layers/HtmlRenderer";
import { Author } from "./layers/Author";
import { PostHeader } from "./layers/PostHeader";
import { PostFooter } from "./layers/PostFooter";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { PostDataParam } from "@interfaces/post";
import { useNavigate } from "react-router-dom";
import { PostContentUpdateModal } from "./layers/PostContentUpdateModal";
import { PostDeleteModal } from "./layers/PostDeleteModal";
import { PostMenus } from "./layers/PostMenus";
import { PostCanCommentModal } from "./layers/PostCanCommentModal";
import { PostCanVoteModal } from "./layers/PostCanVoteModal";

const textLimit = 2500

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
  const navigate = useNavigate()
  const temperature = parseFloat(Math.pow((props.num_vote_up * 1.25 + props.comments_count * .85), .3).toFixed(2))

  const [editorModal, setEditorModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [canCommentModal, setCanCommentModal] = useState(false)
  const [canVoteModal, setCanVoteModal] = useState(false)

  useEffect(() => {
    setImages(props.images?.map(x => x.image))
  }, [])


  return (
    <>
      <div className={classes.cover}>
        <div className={classes.wrapper}>
          <Author {...props.author} />
          <div>
            <Group>
              <PostHeader name={`${props.author.first_name} ${props.author.last_name}`} image={props.author.avatar} temp={temperature} postedAt={dayjs(props.created_at).fromNow()} />
              <PostMenus is_admin={props.group.is_admin} is_moderator={props.group.is_moderator} author_id={props.author.id} setCanCommentModal={setCanCommentModal} setCanVoteModal={setCanVoteModal} setDeleteModal={setDeleteModal} setEditorModal={setEditorModal} />
            </Group>
            {props.content && (
              <div onClick={() => navigate(`/c/${props.author.username}/p/${props.id}?details=true`)}>
                <HtmlRenderer body={props.content} id={props.id} author={props.author.username} />
              </div>
            )}
            {images.length !== 0 && (
              <ImageCarousel sources={images} />
            )}
            {props.post_type !== "announcement" && (
              <PostFooter {...props} />
            )}

          </div>
        </div>
      </div>
      <PostContentUpdateModal richText={true} opened={editorModal} setOpened={setEditorModal} content={props.content} id={props.id} />
      <PostDeleteModal opened={deleteModal} setOpened={setDeleteModal} id={props.id} />
      <PostCanCommentModal opened={canCommentModal} setOpened={setCanCommentModal} id={props.id} can_comment={props.can_comment} />
      <PostCanVoteModal opened={canVoteModal} setOpened={setCanVoteModal} id={props.id} can_vote={props.can_vote} />
    </>
  );
}
