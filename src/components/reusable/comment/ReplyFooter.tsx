import { Group } from "@mantine/core";
import { ClapCount } from "../post/layers/ClapCount";
import { AwardCount } from "../post/layers/AwardCount";

export function ReplyFooter() {
  return (
    <Group spacing="lg">
      <ClapCount />
      <AwardCount />
    </Group>
  );
}
