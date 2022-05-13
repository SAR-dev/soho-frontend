import { createStyles, Text, TextInput, ActionIcon, Center, Stack } from "@mantine/core";
import { ArrowRight, BellRinging, LivePhoto } from "tabler-icons-react";

const useStyles = createStyles((theme, _params, getRef) => ({
  typography: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  // askInput: {
  //   ['input']: {
  //     borderWidth: 2,
  //   }
  // },
  askTime: {
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.xs,
  },
}));

export function AmaRenderer({ body }: { body: string }) {
  const { classes } = useStyles();
  return (
    <Stack spacing="sm" className={classes.typography}>
      <Text size="lg">{body}</Text>
      <Center inline style={{ justifyContent: "start" }}>
        <LivePhoto className="rotate" color="yellow" size={18} />
        <Text size="xs" color="yellow" weight={700} className={classes.askTime}>
          Live - April 14 - 10:00 AM
        </Text>
        <ActionIcon variant="light" size="sm" color="yellow">
          <BellRinging size={12} />
        </ActionIcon>
      </Center>
      <TextInput
        radius={18}
        size="sm"
        rightSection={
          <ActionIcon size={28} radius="xl" color="blue" variant="light">
            <ArrowRight size={18} />
          </ActionIcon>
        }
        placeholder="Ask question here..."
        rightSectionWidth={38}
        className="thick-border"
      />
    </Stack>
  );
}
