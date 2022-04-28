import {
  Paper,
  createStyles,
  SegmentedControl,
  Center,
  Box,
} from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { useMemo, useState } from "react";
import { FaPoll } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[2]
        : theme.colors.dark[5],
    padding: theme.spacing.sm
  },
  menus: {
    marginBottom: theme.spacing.sm
  },
  editor: {
    width: "100%",
  },
}));

const initialValue = "";

export function EditorWrapper() {
  const [value, setValue] = useState("discussion");
  const [text, setText] = useState(initialValue);
  const { classes } = useStyles();

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
      source: async (
        searchTerm: string,
        renderList: (arg0: { id: number; value: string }[]) => void
      ) => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const result = response.data.map(
          (item: { id: number; name: string }) => {
            return { id: item.id, value: item.name };
          }
        );
        renderList(result);
      },
    }),
    []
  );

  return (
    <Paper>
      <Paper className={classes.container}>
        <SegmentedControl
          value={value}
          onChange={setValue}
          color="blue"
          data={[
            {
              label: (
                <Center py={5}>
                  <MdEmojiPeople />
                  <Box ml={10}>Discussion</Box>
                </Center>
              ),
              value: "discussion",
            },
            {
              label: (
                <Center py={5}>
                  <MdQuestionAnswer />
                  <Box ml={10}>AMA</Box>
                </Center>
              ),
              value: "ama",
            },
            {
              label: (
                <Center py={5}>
                  <FaPoll />
                  <Box ml={10}>Poll</Box>
                </Center>
              ),
              value: "poll",
            },
            {
              label: (
                <Center py={5}>
                  <BsDropletHalf />
                  <Box ml={10}>Drop</Box>
                </Center>
              ),
              value: "drop",
            },
          ]}
          className={classes.menus}
        />
        <RichTextEditor
          value={text}
          onChange={setText}
          className={classes.editor}
          mentions={mentions}
          placeholder="Type @ or # to see mentions autocomplete"
          controls={[
            ["bold", "italic", "underline", "strike"],
            ['blockquote', 'code'],
            ["h3", "h4", "h5"],
            ["unorderedList", "orderedList"],
            ["alignLeft", "alignCenter", "alignRight"],
            ["link", "image", "video"],
            ["clean"]
          ]}
        />
      </Paper>
    </Paper>
  );
}
