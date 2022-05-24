import { useState } from "react";
import { createStyles, Group, Button, Select, Textarea, Tooltip } from "@mantine/core";
import { Calendar, Eye, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import insertTextAtCursor from "insert-text-at-cursor";
import { CalenderModal } from "../../reusable/modal/CalenderModal";
import dayjs from 'dayjs';

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
  calenderButton: {
    fontWeight: 400,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[0],
  },
  activeCalender: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[8],
  },
  inactiveCalender: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[8],
  }
}));

const initialValue = "";

interface props {
  toogle: () => void;
}

export function AmaPostTab({ toogle }: props) {
  const [text, setText] = useState(initialValue);
  const { classes, cx } = useStyles();
  const [visibility, setVisibility] = useState<any | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showCalender, setShowCalender] = useState(false)

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
          <Button className={cx(classes.calenderButton, {[classes.activeCalender]: date, [classes.inactiveCalender]: !date})} leftIcon={<Calendar size={16} />} variant="light" color="gray" size="xs" onClick={() => setShowCalender(true)}>
          {date ? dayjs(date).format('MMM DD, YYYY  hh:mm A') : "Select Deadline"}
          </Button>
        </Tooltip>
        <Button size="xs" ml="auto" color="gray" onClick={() => toogle()}>
          Close
        </Button>
        <Button size="xs" leftIcon={<Send size={16} />}>
          Submit
        </Button>
      </Group>
      <CalenderModal opened={showCalender} setOpened={setShowCalender} date={date} setDate={setDate} />
    </>
  );
}
