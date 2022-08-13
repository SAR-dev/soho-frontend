import { createStyles, Group, Text } from "@mantine/core";
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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PostContentUpdateModal } from "./layers/PostContentUpdateModal";
import { PostDeleteModal } from "./layers/PostDeleteModal";
import { PostMenus } from "./layers/PostMenus";
import { PostCanCommentModal } from "./layers/PostCanCommentModal";
import { PostCanVoteModal } from "./layers/PostCanVoteModal";

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
  const navigate = useNavigate()
  const temperature = parseFloat(Math.pow((props.num_vote_up * 1.25 + props.comments_count * .85), .3).toFixed(2))
  const [editorModal, setEditorModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [canCommentModal, setCanCommentModal] = useState(false)
  const [canVoteModal, setCanVoteModal] = useState(false)

  return (
    <>
      <div className={classes.cover}>
        <div className={classes.wrapper}>
          <Author {...props.author} />
          <div className={classes.wFull}>
            <Group>
              <PostHeader name={`${props.author.first_name} ${props.author.last_name}`} image={props.author.avatar} temp={temperature} postedAt={dayjs(props.created_at).fromNow()} />
              <PostMenus is_admin={props.group.is_admin} is_moderator={props.group.is_moderator} author_id={props.author.id} setCanCommentModal={setCanCommentModal} setCanVoteModal={setCanVoteModal} setDeleteModal={setDeleteModal} setEditorModal={setEditorModal} />
            </Group>
            {props.content && (
              <div onClick={() => navigate(`/c/${props.author.username}/p/${props.id}?details=true`)}>
                <HtmlRenderer body={props.content} id={props.id} author={props.author.username} />
              </div>
            )}
            {props.choices && (
              <>
                <PollItems {...props} />
                <div className={cx(classes.flex, classes.expire)}>
                  {checkIfExpired({ duration: props.duration, created_at: props.created_at }) && (
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
      </div>
      <PostContentUpdateModal richText={true} opened={editorModal} setOpened={setEditorModal} content={props.content} id={props.id} />
      <PostDeleteModal opened={deleteModal} setOpened={setDeleteModal} id={props.id} />
      <PostCanCommentModal opened={deleteModal} setOpened={setDeleteModal} id={props.id} can_comment={props.can_comment} />
      <PostCanVoteModal opened={canVoteModal} setOpened={setCanVoteModal} id={props.id} can_vote={props.can_vote} />
    </>
  );
}
