import { Choice } from "@interfaces/post";
import {
  createStyles,
  Box,
  SimpleGrid,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Poll } from "./Poll";

const LINK_HEIGHT = 27;

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    marginBottom: theme.spacing.lg,
  },
}));

export function PollItems({ choices }: { choices: Choice[] }) {
  const { classes, cx } = useStyles();

  const [totalVotes, setTotalVotes] = useState()

  useEffect(() => {
    
  }, [choices])
  

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={1} spacing="sm">
        {choices.map((e, i) => (
          <Poll active={true} text={e.text} key={i} />
        ))}
      </SimpleGrid>
    </div>
  );
}
