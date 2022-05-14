import {
  Text,
  Center,
} from "@mantine/core";

interface Props {
  color?: "dimmed" | "red"
}

export function ReplyCount({ color = "dimmed" }: Props) {
  return (
    <Center>
      <Text size="sm" weight={500} color={color}>
        24
      </Text>
      <Text size="sm" weight={500} color={color} style={{ marginLeft: 5 }}>
        Reply
      </Text>
    </Center>
  );
}
