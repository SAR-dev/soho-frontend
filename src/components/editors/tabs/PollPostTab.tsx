import { useRef, useState, useEffect } from "react";
import {
  createStyles,
  Group,
  Button,
  Select,
  ActionIcon,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { Editor } from "@mantine/rte";
import { ImageDropzone } from "../ImageDropzone";
import { Calendar, Eye, Minus, Plus, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import { Poll } from "../../reusable/post/layers/Poll";
import { TextEditor } from "../TextEditor";
import dayjs from 'dayjs';
import { CalenderModal } from "../../reusable/modal/CalenderModal";

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

interface Props {
  toogle: () => void;
  setLoading: (params: boolean) => void;
}

export function PollPostTab({ toogle, setLoading }: Props) {
  const { classes, cx } = useStyles();
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState<any | null>(null);
  const editorRef = useRef<Editor>(null);
  const [datetime, setDatetime] = useState<Date | null>(null);
  const [showCalender, setShowCalender] = useState(false)
  const [images, setImages] = useState<Array<number>>([])

  useEffect(() => {
    editorRef?.current?.focus();
  }, []);

  const insertText = (text: string) => {
    const quillRef = editorRef?.current?.getEditor();
    var range = quillRef?.getSelection();
    let position = range ? range.index : 0;
    quillRef?.insertText(position, text);
  };

  const addImage = (id: number) => {
    setImages(images => [...images, id])
  }

  return (
    <>
      <TextEditor editorRef={editorRef} text={text} setText={setText} insertText={insertText}  />
      <ImageDropzone disabled={false} images={images} addImage={addImage} />

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
        <Tooltip label="Set Deadline" position="top">
          <Button className={cx(classes.calenderButton, {[classes.activeCalender]: datetime, [classes.inactiveCalender]: !datetime})} leftIcon={<Calendar size={16} />} variant="light" color="gray" size="xs" onClick={() => setShowCalender(true)}>
            {datetime ? dayjs(datetime).format('MMM DD, YYYY  hh:mm A') : "Select Deadline"}
          </Button>
        </Tooltip>
        <Button size="xs" ml="auto" color="gray" onClick={() => toogle()}>
          Close
        </Button>
        <Button size="xs" leftIcon={<Send size={16} />}>
          Submit
        </Button>
      </Group>
      <CalenderModal opened={showCalender} setOpened={setShowCalender} datetime={datetime} setDatetime={setDatetime} />
    </>
  );
}
