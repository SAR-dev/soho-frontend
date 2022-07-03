import { Group } from "@mantine/core";
import { CommentReplyCount } from "./CommentReplyCount";
import { AwardCount } from "../post/layers/AwardCount";
import { CommentClapCount } from "./CommentClapCount";

export function CommentFooter({commentsCount, clapCount}:{commentsCount: number, clapCount: number}) {
  return (
    <Group spacing="lg">
      <CommentReplyCount commentsCount={commentsCount} color="red" />
      <CommentClapCount clapCount={clapCount} />
      <AwardCount />
    </Group>
  );
}
