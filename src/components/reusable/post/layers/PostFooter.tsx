import { Group } from "@mantine/core";
import { PostReplyCount } from "./PostReplyCount";
import { PostClapCount } from "./PostClapCount";
import { AwardCount } from "./AwardCount";
import { PostDataParam } from "@interfaces/post";

export function PostFooter({ ...props }: PostDataParam) {
  return (
    <Group spacing="lg">
      <PostReplyCount postId={props.id} authorName={props.author.username} commentsCount={props.comments_count} />
      <PostClapCount postId={props.id} clapCount={props.num_vote_up} />
      <AwardCount />
    </Group>
  );
}
