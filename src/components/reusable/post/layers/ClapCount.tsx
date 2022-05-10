import {
  Text,
  Center,
} from "@mantine/core";
import { MdWavingHand } from "react-icons/md";

export function ClapCount() {
  return (
    <Center>
      <MdWavingHand />
      <Text size="sm" weight={500} style={{ marginLeft: 5 }}>
        132
      </Text>
    </Center>
  );
}
