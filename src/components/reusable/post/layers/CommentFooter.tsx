import { Group } from "@mantine/core";
import { ReplyCount } from "./ReplyCount";
import { ClapCount } from "./ClapCount";
import { AwardCount } from "./AwardCount";

export function CommentFooter() {
  return (
    <Group spacing="lg">
      <ReplyCount color="red" />
      <ClapCount />
      <AwardCount />
    </Group>
  );
}
