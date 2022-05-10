import {
  Text,
  Center,
} from "@mantine/core";

export function ReplyCount() {
  return (
    <Center>
      <Text size="sm" weight={500}>
        24
      </Text>
      <Text size="sm" weight={500} color="dimmed" style={{ marginLeft: 5 }}>
        Reply
      </Text>
    </Center>
  );
}
