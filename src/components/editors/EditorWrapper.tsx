import { useMemo, useRef, useState } from "react";
import {
  Paper,
  createStyles,
  SegmentedControl,
  Center,
  Box,
  Group,
  Autocomplete,
  Switch,
  Button,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { FaPoll } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import axios from "axios";
import "./EditorStyles.css";
import { ImageDropzone } from "./ImageDropzone";
import { Hash, Send } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    padding: theme.spacing.sm
  },
  menus: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
    marginBottom: theme.spacing.sm,
    width: "100%"
  },
  editor: {
    width: "100%",
    marginBottom: theme.spacing.sm,
    border: 'none'
  },
}));

const initialValue = "";

export function EditorWrapper() {
  const [value, setValue] = useState("discussion");
  const [text, setText] = useState(initialValue);
  const { classes } = useStyles();
  const [category, setCategory] = useState({});
  const [checked, setChecked] = useState(false);

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
                <Center py={3}>
                  <MdEmojiPeople />
                  <Box ml={10}>Discussion</Box>
                </Center>
              ),
              value: "discussion",
            },
            {
              label: (
                <Center py={3}>
                  <MdQuestionAnswer />
                  <Box ml={10}>AMA</Box>
                </Center>
              ),
              value: "ama",
            },
            {
              label: (
                <Center py={3}>
                  <FaPoll />
                  <Box ml={10}>Poll</Box>
                </Center>
              ),
              value: "poll",
            },
            {
              label: (
                <Center py={3}>
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
          placeholder="Start typing here...."
          spellCheck={false}
          controls={[
            ["bold", "italic", "underline", "strike"],
            ['blockquote', 'code'],
            ["unorderedList", "orderedList"],
            ["alignLeft", "alignCenter", "alignRight"],
            ["clean"],
          ]}
        />
        <Group>
          <Autocomplete
            placeholder="Pick a Category"
            data={[{ id: 1, value: 'React' }, { id: 2, value: 'Angular' }, { id: 3, value: 'Svelte' }, { id: 4, value: 'Vue' }]}
            onItemSubmit={e => setCategory(e)}
            icon={<Hash size={16} />}
            size="xs"
          />
          <Switch
            label="Mark as announcement"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
          <Button size="xs" ml="auto" color="gray">Close</Button>
          <Button size="xs" leftIcon={<Send size={16}  />}>Submit</Button>
        </Group>
        <ImageDropzone disabled={false} />
      </Paper>
    </Paper>
  );
}
