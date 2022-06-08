import { useRef, useState, useEffect } from "react";
import { Paper, createStyles, SegmentedControl, Center, Text, LoadingOverlay } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { FaPoll } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import { DiscussionPostTab } from "./tabs/DiscussionPostTab";
import { AmaPostTab } from "./tabs/AmaPostTab";
import { PollPostTab } from "./tabs/PollPostTab";
import { Video } from "tabler-icons-react";
import { PremierPostTab } from "./tabs/PremierPostTab";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCommunity } from "../../helpers";

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
  id: number;
  title: null;
  about: null;
  members_name: string;
  color: string;
  status: string;
  subscribers_count: number;
  subscribed: boolean;
  post_count: number;
  author: Author;
  common_member: Author;
  is_admin: boolean;
  is_moderator: boolean;
  created_at: Date;
  updated_at: Date;
}

interface Author {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  avatar: string;
}


const editors = [
  { key: "discussion", name: 'Discussion', icon: <MdEmojiPeople size={16} /> },
  { key: "poll", name: "Poll", icon: <FaPoll size={16} /> },
  { key: "ama", name: "AMA", icon: <MdQuestionAnswer size={16} /> },
  { key: "premier", name: "Premier", icon: <Video size={16} /> },
  // { key: "drop", name: "Drop", icon: <BsDropletHalf /> },
]

interface Props {
  toogle: () => void;
}

export function EditorWrapper({ toogle }: Props) {
  const { author } = useParams<"author">();

  const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['community', author], () => getCommunity(author))

  const [value, setValue] = useState("discussion");
  const { classes } = useStyles();
  const editorRef = useRef<Editor>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    editorRef?.current?.focus();
  }, []);

  return (
    <Paper radius={0} style={{position: 'relative'}}>
      <Paper className={classes.container}>
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
        {value === "discussion" && <DiscussionPostTab toogle={toogle} setLoading={setLoading} />}
        {value === "ama" && <AmaPostTab toogle={toogle} setLoading={setLoading} />}
        {value === "poll" && <PollPostTab toogle={toogle} setLoading={setLoading} />}
        {value === "premier" && <PremierPostTab toogle={toogle} setLoading={setLoading} />}
      </Paper>
      <LoadingOverlay visible={loading} />
    </Paper>
  );
}
