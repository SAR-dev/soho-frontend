import { useRef, useState, useEffect } from "react";
import {
  createStyles,
  Group,
  Button,
  Select,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { Editor } from "@mantine/rte";
import { ImageDropzone } from "../ImageDropzone";
import { Eye, Minus, Plus, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import { Poll } from "../../reusable/post/Poll";
import { TextEditor } from "../TextEditor";

const useStyles = createStyles((theme) => ({
  dropdown: {
    width: 150,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  textInput: {
    width: "100%",
  },
  actionButton: {
    marginLeft: theme.spacing.sm,
  },
}));

interface props {
  toogle: () => void;
}

export function PollPostTab({ toogle }: props) {
  const { classes, cx } = useStyles();
  const [visibility, setVisibility] = useState<any | null>(null);
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
      <TextEditor editorRef={editorRef} />
      <div className={classes.flex}>
        <Poll active={false} text="React Native" />
        <ActionIcon variant="filled" className={classes.actionButton}>
          <Minus size={14} />
        </ActionIcon>
      </div>
      <div className={classes.flex}>
        <TextInput
          size="xs"
          placeholder="Add poll option"
          className={classes.textInput}
        />
        <ActionIcon variant="filled" className={classes.actionButton}>
          <Plus size={14} />
        </ActionIcon>
      </div>
      <Group>
        <EmojiPopover insertText={insertText} />
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
        <Button size="xs" ml="auto" color="gray" onClick={() => toogle()}>
          Close
        </Button>
        <Button size="xs" leftIcon={<Send size={16} />}>
          Submit
        </Button>
      </Group>
      <ImageDropzone disabled={false} />
    </>
  );
}
