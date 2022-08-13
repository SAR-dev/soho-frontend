import { Group } from "@mantine/core";
import { CommentReplyCount } from "./CommentReplyCount";
import { AwardCount } from "../post/layers/AwardCount";
import { CommentClapCount } from "./CommentClapCount";

export function CommentFooter({ commentsCount, clapCount, play, setPlay }: { commentsCount: number, clapCount: number, play: boolean, setPlay: (params: boolean) => void }) {
  return (
    <Group spacing="lg">
      <CommentReplyCount commentsCount={commentsCount} color="red" />
      {/* <CommentClapCount clapCount={clapCount} play={play} setPlay={setPlay} /> */}
      {/* <AwardCount /> */}
    </Group>
  );
}
