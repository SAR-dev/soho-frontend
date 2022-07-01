import { SimpleGrid } from "@mantine/core";
import { Poll } from "./Poll";
import { PostDataParam } from "@interfaces/post";

export function PollItems({ ...props }: PostDataParam) {
  return (
      <SimpleGrid cols={1} spacing="sm">
      {/* && sortArray(props.choices, { by: "num_vote_up", order: "desc" }) */}
        {props.choices?.map((e, i) => (
            <Poll choice={e} totalVotes={props.choices?.reduce((accum, item) => accum + item.num_vote_up, 0)} data={props} />
        ))}
      </SimpleGrid>
  );
}
