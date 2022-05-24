import { Group, Button } from "@mantine/core";
import { Eye, Plus } from "tabler-icons-react";

export function AwardCount() {
  return (
    <Group spacing={2}>
      {[...Array(5)].map((e, i) => (
        <Button
          styles={(theme) => ({
            root: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[2],
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
          size="xs"
          compact
          leftIcon={<Eye size={12} />}
          key={i}
        >
          01
        </Button>
      ))}
      <Button
          styles={(theme) => ({
            root: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[2],
            },
            leftIcon: {
              marginRight: 5,
            },
          })}
          size="xs"
          compact
          leftIcon={<Plus size={12} />}
        >
          Award
        </Button>
    </Group>
  );
}
