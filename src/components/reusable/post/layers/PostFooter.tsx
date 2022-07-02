import { Group } from "@mantine/core";
import { ReplyCount } from "./ReplyCount";
import { ClapCount } from "./ClapCount";
import { AwardCount } from "./AwardCount";
import { PostDataParam } from "@interfaces/post";

export function PostFooter({ ...props }: PostDataParam) {
  return (
    <Group spacing="lg">
      <ReplyCount postId={props.id} authorName={props.author.username} commentsCount={props.comments_count} />
      <ClapCount postId={props.id} clapCount={props.num_vote_up} />
      <AwardCount />
    </Group>
  );
}
