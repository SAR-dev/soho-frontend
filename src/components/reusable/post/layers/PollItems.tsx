import {
  createStyles,
  Box,
  SimpleGrid,
} from "@mantine/core";
import { Poll } from "./Poll";

const LINK_HEIGHT = 27;

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    marginBottom: theme.spacing.lg,
  },
}));

export function PollItems() {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={1} spacing="sm">
        <Poll active={true} text="React Native" />
        <Poll active={true} text="Vue Js" />
        <Poll active={true} text="Python" />
      </SimpleGrid>
    </div>
  );
}
