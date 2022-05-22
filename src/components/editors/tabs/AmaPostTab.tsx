import { useState } from "react";
import { createStyles, Group, Button, Select, Textarea, Tooltip } from "@mantine/core";
import { ImageDropzone } from "../ImageDropzone";
import { Calendar, Clock, Eye, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import insertTextAtCursor from "insert-text-at-cursor";
import { DatePicker, TimeInput } from "@mantine/dates";

const useStyles = createStyles((theme) => ({
  editor: {
    width: "100%",
    marginBottom: theme.spacing.sm,
  },
  dropdown: {
    width: 150,
  },
  textArea: {
    ["textarea"]: {
      fontSize: theme.fontSizes.lg,
      "&::-webkit-input-placeholder": {
        fontSize: theme.fontSizes.sm,
      },
    },
  },
}));

const initialValue = "";

interface props {
  toogle: () => void;
}

export function AmaPostTab({ toogle }: props) {
  const [text, setText] = useState(initialValue);
  const { classes, cx } = useStyles();
  const [visibility, setVisibility] = useState<any | null>(null);
  const [date, setDate] = useState<Date | null>(new Date());

  function isInputElement(elem: HTMLElement | null): elem is HTMLInputElement {
    if (!elem) {
      return false;
    }

    return true;
  }

  const insertText = (text: string) => {
    const el = document.getElementById("emoji-textarea");
    if (isInputElement(el)) {
      insertTextAtCursor(el, text);
    }
  };

  return (
    <>
      <Textarea
        placeholder="Start typing here...."
        autosize
        minRows={2}
        value={text}
        autoFocus
        onChange={(event) => setText(event.currentTarget.value)}
        className={cx(classes.editor, classes.textArea, "thick-border")}
        id="emoji-textarea"
      />
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
        <Tooltip label="Set Deadline" position="top">
          <DatePicker size="xs" icon={<Calendar size={16} />} value={date} dropdownType="modal" onChange={setDate} />
        </Tooltip>
        <Tooltip label="Set Deadline" position="top">
        <TimeInput
          defaultValue={new Date()}
          size="xs"
          icon={<Clock size={16} />}
          value={date}
          onChange={setDate}
        />
        </Tooltip>
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
