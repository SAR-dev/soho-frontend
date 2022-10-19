import { useState } from "react";
import { Paper, createStyles, SegmentedControl, Center, Text, LoadingOverlay } from "@mantine/core";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { MdEmojiPeople } from "react-icons/md";
import { DiscussionPostTab } from "./tabs/DiscussionPostTab";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCommunity } from "../../helpers";
import { CommunityDataParam } from "@interfaces/community";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    padding: theme.spacing.sm,
  },
  menus: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    marginBottom: theme.spacing.sm,
    width: "-webkit-fill-available",
  },
}));

interface DataParam {
  data: CommunityDataParam
}


const editors = [
  { key: "discussion", name: 'Discussion', icon: <BsChatSquareDotsFill size={16} /> }
]

interface Props {
  toogle: () => void;
}

export function EditorWrapper({ toogle }: Props) {
  const { author } = useParams<"author">();

  const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['community', author], () => getCommunity({ username: author }))

  const [value, setValue] = useState("discussion");
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false)

  return (
    <Paper radius={0} style={{ position: 'relative' }}>
      <Paper className={classes.container}>
        {data && (
          <>
            {data.data.is_admin ? (
              <SegmentedControl
                value={value}
                onChange={setValue}
                color="blue"
                size="sm"
                data={
                  editors.map(el => ({
                    label: (
                      <Center py={3}>
                        {el.icon}
                        <Text size="xs" ml={10}>
                          {el.name}
                        </Text>
                      </Center>
                    ), value: el.key
                  }))
                }
                className={classes.menus}
              />
            ) : (
              <SegmentedControl
                value={value}
                onChange={setValue}
                color="blue"
                size="sm"
                data={
                  [{
                    label: (
                      <Center py={3}>
                        <MdEmojiPeople size={16} />
                        <Text size="xs" ml={10}>
                          Discussion
                        </Text>
                      </Center>
                    ), value: "discussion"
                  }]
                }
                className={classes.menus}
              />
            )}
            {value === "discussion" && <DiscussionPostTab toogle={toogle} setLoading={setLoading} is_admin={data.data.is_admin} />}
          </>
        )}
      </Paper>
      <LoadingOverlay visible={loading} />
    </Paper>
  );
}
