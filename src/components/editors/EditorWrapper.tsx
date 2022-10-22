import { useRef, useState, useEffect } from "react";
import { Paper, createStyles, SegmentedControl, Center, Text, LoadingOverlay, Drawer } from "@mantine/core";
import { FaPoll } from "react-icons/fa";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import { DiscussionPostTab } from "./tabs/DiscussionPostTab";
import { AmaPostTab } from "./tabs/AmaPostTab";
import { PollPostTab } from "./tabs/PollPostTab";
import { Video } from "tabler-icons-react";
import { PremierPostTab } from "./tabs/PremierPostTab";
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
  drawer: {
    padding: theme.spacing.lg
  }
}));

interface DataParam {
  data: CommunityDataParam
}

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
          <Drawer onClose={() => toogle} size="full" opened withCloseButton={false} overlayOpacity={0.9}>
            <div className={classes.drawer}>
              <Text weight={700} size="lg" style={{marginBottom: 20}}>Start typing below....</Text>
            <DiscussionPostTab toogle={toogle} setLoading={setLoading} is_admin={data.data.is_admin} />
            </div>
          </Drawer>
        )}
      </Paper>
      <LoadingOverlay visible={loading} />
    </Paper>
  );
}
