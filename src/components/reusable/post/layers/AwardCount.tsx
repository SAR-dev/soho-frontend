import { Group, Button } from "@mantine/core";
import { Eye } from "tabler-icons-react";

export function AwardCount() {
  return (
    <Group spacing={2}>
      {[
        ...Array(5).map((el, i) => (
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
        )),
      ]}
    </Group>
  );
}
