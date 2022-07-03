import { Group } from "@mantine/core";
import { AwardCount } from "../post/layers/AwardCount";
import { CommentClapCount } from "./CommentClapCount";
import { CommentReplyCount } from "./CommentReplyCount";

export function ReplyFooter({clapCount}:{clapCount: number}) {
  return (
    <Group spacing="lg">
      <CommentClapCount clapCount={clapCount} />
      <AwardCount />
    </Group>
  );
}
