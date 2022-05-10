import { Group } from "@mantine/core";
import { ReplyCount } from "./ReplyCount";
import { ClapCount } from "./ClapCount";
import { AwardCount } from "./AwardCount";

export function PostFooter() {
  return (
    <Group spacing="lg">
      <ReplyCount />
      <ClapCount />
      <AwardCount />
    </Group>
  );
}
