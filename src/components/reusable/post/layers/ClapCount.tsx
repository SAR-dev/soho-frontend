import {
  Text,
  Center,
  ActionIcon,
} from "@mantine/core";
import { MdWavingHand } from "react-icons/md";

export function ClapCount() {
  return (
    <Center>
      <ActionIcon variant="transparent">
        <MdWavingHand size={16} />
      </ActionIcon>
      <Text size="sm" weight={500} style={{ marginLeft: 2 }}>
        132
      </Text>
    </Center>
  );
}
