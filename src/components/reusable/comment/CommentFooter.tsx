import { Group } from "@mantine/core";
import { ReplyCount } from "../post/layers/ReplyCount";
import { ClapCount } from "../post/layers/ClapCount";
import { AwardCount } from "../post/layers/AwardCount";

export function CommentFooter() {
  return (
    <Group spacing="lg">
      <ReplyCount color="red" />
      <ClapCount />
      <AwardCount />
    </Group>
  );
}
