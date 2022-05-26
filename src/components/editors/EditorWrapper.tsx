import { useRef, useState, useEffect } from "react";
import { Paper, createStyles, SegmentedControl, Center, Text } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { FaPoll } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import { DiscussionPostTab } from "./tabs/DiscussionPostTab";
import { AmaPostTab } from "./tabs/AmaPostTab";
import { PollPostTab } from "./tabs/PollPostTab";
import { Video } from "tabler-icons-react";
import { PremierPostTab } from "./tabs/PremierPostTab";

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

const editors = [
  { key: "discussion", name: 'Discussion', icon: <MdEmojiPeople /> },
  { key: "poll", name: "Poll", icon: <FaPoll /> },
  { key: "ama", name: "AMA", icon: <MdQuestionAnswer /> },
  { key: "premier", name: "Premier", icon: <Video /> },
  // { key: "drop", name: "Drop", icon: <BsDropletHalf /> },
]

interface Props {
  toogle: () => void;
}

export function EditorWrapper({ toogle }: Props) {
  const [value, setValue] = useState("discussion");
  const { classes } = useStyles();
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    editorRef?.current?.focus();
  }, []);

  return (
    <Paper radius={0}>
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
        {value === "discussion" && <DiscussionPostTab toogle={toogle} />}
        {value === "ama" && <AmaPostTab toogle={toogle} />}
        {value === "poll" && <PollPostTab toogle={toogle} />}
        {value === "premier" && <PremierPostTab toogle={toogle} />}
      </Paper>
    </Paper>
  );
}
