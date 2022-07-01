import { SimpleGrid } from "@mantine/core";
import { Poll } from "./Poll";
import { PostDataParam } from "@interfaces/post";
import { useState } from "react";

export function PollItems({...props}: PostDataParam) {
  const [choices, setChoices] = useState(props.choices)

  return (
      <SimpleGrid cols={1} spacing="sm">
        {props.choices?.map((e, i) => (
          <Poll choice={e} totalVotes={choices?.reduce((accum, item) => accum + item.num_vote_up, 0)} data={props} key={i} />
        ))}
      </SimpleGrid>
  );
}
