import { Group } from "@mantine/core";
import { AwardCount } from "../post/layers/AwardCount";
import { CommentClapCount } from "./CommentClapCount";
import { CommentReplyCount } from "./CommentReplyCount";

export function ReplyFooter({clapCount,  play, setPlay}:{clapCount: number, play: boolean, setPlay: (params: boolean) => void}) {
  return (
    <Group spacing="lg">
      <CommentClapCount clapCount={clapCount} play={play} setPlay={setPlay} />
      {/* <AwardCount /> */}
    </Group>
  );
}
