import { Group } from "@mantine/core";
import { CommentReplyCount } from "./layers/CommentReplyCount";

export function CommentFooter({ commentsCount, clapCount, play, setPlay }: { commentsCount: number, clapCount: number, play: boolean, setPlay: (params: boolean) => void }) {
  return (
    <Group spacing="lg">
      <CommentReplyCount commentsCount={commentsCount} color="red" />
    </Group>
  );
}
