import { ChoicePostDataInterface } from "@interfaces/poll";
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

export function PollItems({ data, setData }: { data: ChoicePostDataInterface, setData: (props: any) => void }) {
  const { classes, cx } = useStyles();

  const [votedId, setVotedId] = useState(data.choices_voted)
  const [totalVotes, setTotalVotes] = useState(data.choices?.reduce((accum, item) => accum + item.num_vote_up, 0))

  // useEffect(() => {
  // }, [choices])

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={1} spacing="sm">
        {data.choices?.map((e, i) => (
          <Poll choice={e} data={data} setData={setData} key={i} />
        ))}
      </SimpleGrid>
    </div>
  );
}
