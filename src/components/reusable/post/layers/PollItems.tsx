import { SimpleGrid } from "@mantine/core";
import { Poll } from "./Poll";
import { PostDataParam } from "@interfaces/post";
import { useAutoAnimate } from '@reusable/formkit/auto-animate/react'
import sortArray from "sort-array";

export function PollItems({ ...props }: PostDataParam) {
  const [parent] = useAutoAnimate<HTMLDivElement>()

  return (
      <SimpleGrid cols={1} spacing="sm" mb="sm" ref={parent}>
        {props.choices && sortArray(props.choices, { by: "num_vote_up", order: "desc" }).map((e, i) => (
            <Poll choice={e} totalVotes={props.choices?.reduce((accum, item) => accum + item.num_vote_up, 0)} data={props} key={e.id}/>
        ))}
      </SimpleGrid>
  );
}
