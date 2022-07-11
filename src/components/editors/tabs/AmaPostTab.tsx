import { useEffect, useState } from "react";
import { createStyles, Group, Button, Select, Textarea, Tooltip, List, Text, NumberInput } from "@mantine/core";
import { AlertCircle, Calendar, Check, Eye, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import insertTextAtCursor from "insert-text-at-cursor";
import { CalenderModal } from "../../reusable/modal/CalenderModal";
import dayjs from 'dayjs';
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { createAuthorPost, parseErrors } from "../../../helpers";
import { ErrorMessage } from "@reusable/ErrorMessage";

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
      overflow: 'hidden',
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
  },
  errorHolder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colorScheme === "dark"
      ? theme.colors.dark[5]
      : theme.colors.gray[2],
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colorScheme === 'dark'
      ? theme.fn.rgba(theme.colors.yellow[1], 0.25)
      : theme.colors[theme.primaryColor][0],
  },
  small: {
    width: 70
  }
}));

interface Props {
  toogle: () => void;
  setLoading: (params: boolean) => void;
}

const times = [
  {label: "MM", value: String(60)},
  {label: "HH", value: String(60*60)},
  {label: "DD", value: String(60*60*24)},
]

export function AmaPostTab({ toogle, setLoading }: Props) {
  const { author } = useParams<"author">();
  const notifications = useNotifications();
  const queryClient = useQueryClient()

  const { classes, cx } = useStyles();
  const [text, setText] = useState("");
  const [datetime, setDatetime] = useState<Date | null>(null);
  const [duration, setDuration] = useState(1)
  const [format, setFormat] = useState<string>(times[1].value)
  const [showCalender, setShowCalender] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [queryKey, setQueryKey] = useState<string[]>([])

  useEffect(() => {
    if (author) setQueryKey(["type_posts", author, "ama"])
  }, [])


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

  const submit = () => {
    setLoading(true)
    setErrors([])
    const data = {
      content: text?.replace(/<p><br[\/]?><[\/]?p>/g, ''),
      post_type: 'ama',
      release_time: datetime,
      duration: duration*parseInt(format)
    }
    createAuthorPost({ username: author, data: data }).then(res => {
      if (res.error) {
        setErrors(parseErrors(res.error))
        setLoading(false)
      } else {
        notifications.showNotification({
          title: "Post Submitted",
          message: "Your post has been submitted. Please wait for a while for your post to appear in your feed.",
          color: "teal",
          icon: <Check size={18} />,
          autoClose: 5000,
        });
        queryClient.invalidateQueries([...queryKey])
        toogle()
      }
    })
  }

  return (
    <>
      <Textarea
        placeholder="Start typing here...."
        autosize
        minRows={3}
        value={text}
        autoFocus
        onChange={(event) => setText(event.currentTarget.value)}
        className={cx(classes.editor, classes.textArea, "thick-border")}
        id="emoji-textarea"
      />
      <Group>
        <EmojiPopover insertText={insertText} />
        <Tooltip label="Select Release Time" position="top">
          <Button className={cx(classes.calenderButton, { [classes.activeCalender]: datetime, [classes.inactiveCalender]: !datetime })} leftIcon={<Calendar size={16} />} variant="light" color="gray" size="xs" onClick={() => setShowCalender(true)}>
            {datetime ? dayjs(datetime).format('MMM DD, YYYY  hh:mm A') : "Select Release Time"}
          </Button>
        </Tooltip>
        <Tooltip label="Select Duration" position="top">
          <Group spacing="xs">
            <NumberInput size="xs" className={classes.small} min={1} value={duration} onChange={(val: number) => setDuration(val)} />
            <Select data={[...times]} size="xs" className={classes.small} value={format} onChange={(e:string )=> setFormat(e)} />
          </Group>
        </Tooltip>
        <Button size="xs" ml="auto" color="gray" onClick={() => toogle()}>
          Close
        </Button>
        <Button size="xs" leftIcon={<Send size={16} />} onClick={() => submit()}>
          Publish
        </Button>
      </Group>
      <ErrorMessage errors={errors} />
      <CalenderModal opened={showCalender} setOpened={setShowCalender} datetime={datetime} setDatetime={setDatetime} />
    </>
  );
}
