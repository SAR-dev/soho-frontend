import { useRef, useState, useEffect } from "react";
import { createStyles, Group, Switch, Button, Select } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { ImageDropzone } from "../ImageDropzone";
import { Eye, Hash, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import { TextEditor } from "../TextEditor";
import { PremierDropzone } from "../PremierDropzone";

const useStyles = createStyles((theme) => ({
  dropdown: {
    width: 150,
  },
}));

interface Props {
  toogle: () => void;
}

export function PremierPostTab({ toogle }: Props) {
  const { classes, cx } = useStyles();
  const [category, setCategory] = useState<any | null>(null);
  const [visibility, setVisibility] = useState<any | null>(null);
  const [checked, setChecked] = useState(false);
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    editorRef?.current?.focus();
  }, []);

  const insertText = (text: string) => {
    const quillRef = editorRef?.current?.getEditor();
    var range = quillRef?.getSelection();
    let position = range ? range.index : 0;
    quillRef?.insertText(position, text);
  };

  return (
    <>
      <PremierDropzone />
      <Group>
        <EmojiPopover insertText={insertText} />
        <Select
          placeholder="Pick a Category"
          data={[
            { value: "1", label: "React" },
            { value: "2", label: "Angular" },
            { value: "3", label: "Svelte" },
            { value: "4", label: "Vue" },
          ]}
          icon={<Hash size={16} />}
          searchable
          nothingFound="No options"
          value={category}
          onChange={(e) => setCategory(e)}
          size="xs"
          className={classes.dropdown}
        />
        <Select
          placeholder="Visibility"
          data={[
            { value: "1", label: "Public" },
            { value: "2", label: "Closed" },
            { value: "3", label: "Private" },
          ]}
          icon={<Eye size={16} />}
          searchable
          nothingFound="No options"
          value={visibility}
          onChange={(e) => setVisibility(e)}
          size="xs"
          className={classes.dropdown}
        />
        <Switch
          label="Announcement"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <Button size="xs" ml="auto" color="gray" onClick={() => toogle()}>
          Close
        </Button>
        <Button size="xs" leftIcon={<Send size={16} />}>
          Submit
        </Button>
      </Group>
    </>
  );
}
