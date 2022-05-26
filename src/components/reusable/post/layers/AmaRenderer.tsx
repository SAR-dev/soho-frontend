import { createStyles, Text, TextInput, ActionIcon, Center, Stack, Button } from "@mantine/core";
import { ArrowRight, BellRinging, LivePhoto } from "tabler-icons-react";

const useStyles = createStyles((theme, _params, getRef) => ({
  typography: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  askTime: {
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.xs,
  },
}));

export function AmaRenderer({ body }: { body: string }) {
  const { classes } = useStyles();
  return (
    <Stack spacing="sm" className={classes.typography}>
      <Text size="sm">{body}</Text>
      <Center inline style={{ justifyContent: "start" }}>
        <LivePhoto className="rotate" color="yellow" size={18} />
        <Text size="xs" color="yellow" weight={700} className={classes.askTime}>
          Live - April 14 - 10:00 AM
        </Text>
        <Button size="xs" compact>
          Turn <BellRinging size={14} style={{marginLeft: 5, marginRight: 5}} /> On
        </Button>
      </Center>
      <TextInput
        radius={18}
        size="xs"
        rightSection={
          <ActionIcon size={25} radius="xl" color="blue" variant="light">
            <ArrowRight size={18} />
          </ActionIcon>
        }
        placeholder="Ask question here..."
        rightSectionWidth={30}
        className="thick-border"
      />
    </Stack>
  );
}
