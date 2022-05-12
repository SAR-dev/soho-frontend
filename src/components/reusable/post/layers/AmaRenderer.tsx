import {
  createStyles,
  TypographyStylesProvider,
  Anchor,
  Text,
  TextInput,
  ActionIcon,
  Center,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { ArrowRight, BellRinging, LivePhoto, Search } from "tabler-icons-react";

const useStyles = createStyles((theme, _params, getRef) => ({
  typography: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  askInput: {
    marginTop: theme.spacing.sm,
  },
  askTime: {
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.xs,
  },
}));

export function AmaRenderer({ body }: { body: string }) {
  const { classes } = useStyles();
  return (
    <div className={classes.typography}>
      <Text size="lg">{body}</Text>
      <Center inline className={classes.askInput}>
        <LivePhoto color="yellow" size={18} />
        <Text size="xs" color="yellow" weight={700} className={classes.askTime}>
          Live - April 14 - 10:00 AM
        </Text>
        <ActionIcon variant="light" size="sm" color="yellow">
          <BellRinging size={12} />
        </ActionIcon>
      </Center>
      <TextInput
        radius="xl"
        size="sm"
        rightSection={
          <ActionIcon size={28} radius="xl" color="blue" variant="light">
            <ArrowRight size={18} />
          </ActionIcon>
        }
        placeholder="Ask question here..."
        rightSectionWidth={42}
        className={classes.askInput}
      />
    </div>
  );
}
