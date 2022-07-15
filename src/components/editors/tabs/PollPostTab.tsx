import { useState, useEffect } from "react";
import {
  createStyles,
  Group,
  Button,
  Select,
  ActionIcon,
  TextInput,
  Tooltip,
  NumberInput,
  Center,
  Text
} from "@mantine/core";
import { Check, InfoCircle, Minus, Plus, Send, X } from "tabler-icons-react";
import { Poll } from "../../reusable/post/layers/Poll";
import { useParams } from "react-router-dom";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { createAuthorPost, createPoll, deletePoll, parseErrors } from "../../../helpers";
import { getHotkeyHandler } from "@mantine/hooks";
import { ErrorMessage } from "@reusable/ErrorMessage";
import { Ctiptap } from "src/components/ctiptap";
import { LimitCounter } from "src/components/ctiptap/LimitCounter";

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
  },
  small: {
    width: 100
  },
  mlAuto: {
    marginLeft: "auto"
  },
  icon: {
    marginRight: 3,
  },
}));

interface Props {
  toogle: () => void;
  setLoading: (params: boolean) => void;
}

export interface Poll {
  id: number;
  text: string;
}

const times = [
  { label: "MM", value: String(60) },
  { label: "HH", value: String(60 * 60) },
  { label: "DD", value: String(60 * 60 * 24) },
]

const textLimit = 5000

export function PollPostTab({ toogle, setLoading }: Props) {
  const { author } = useParams<"author">();
  const notifications = useNotifications();
  const queryClient = useQueryClient()

  const { classes, cx } = useStyles();
  const [text, setText] = useState("");
  const [duration, setDuration] = useState(1)
  const [format, setFormat] = useState<string>(times[1].value)
  const [errors, setErrors] = useState<string[]>([])
  const [queryKey, setQueryKey] = useState<string[]>([])

  const [polls, setPolls] = useState<Poll[]>([])

  useEffect(() => {
    if (author) setQueryKey(["type_posts", author, "poll"])
  }, []);

  const submit = () => {
    setLoading(true)
    setErrors([])
    const data = {
      content: text?.replace(/<p><br[\/]?><[\/]?p>/g, ''),
      post_type: 'poll',
      choices: polls.map(e => e.id),
      duration: duration * parseInt(format)
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
      <Ctiptap text={text} setText={setText} limit={textLimit} />
      <Center mb="sm">
        <Center>
          <InfoCircle size={16} className={classes.icon} />
          <Text color="dimmed" size="xs">
            Add poll options carefully. You can not change them later!
          </Text>
        </Center>
        <div className={classes.mlAuto}>
          <LimitCounter count={text.length} limit={textLimit} />
        </div>
      </Center>
      {polls.map((e, i) => (
        <PollItem poll={e} polls={polls} setPolls={setPolls} key={i} />
      ))}
      <PollEditor polls={polls} setPolls={setPolls} />

      <Group>
        <Tooltip label="Select Duration" position="top">
          <Group spacing="xs">
            <NumberInput size="xs" className={classes.small} min={1} value={duration} onChange={(val: number) => setDuration(val)} />
            <Select data={[...times]} size="xs" className={classes.small} value={format} onChange={(e: string) => setFormat(e)} />
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
    </>
  );
}

const PollItem = ({ poll, polls, setPolls }: { poll: Poll, polls: Poll[], setPolls: (params: any) => void }) => {
  const { classes, cx } = useStyles();
  const notifications = useNotifications();

  const [loading, setLoading] = useState(false)

  const submit = () => {
    setLoading(true)
    deletePoll(poll.id).then(res => {
      if (res.error) {
        notifications.showNotification({
          title: "Error deleting the poll!",
          message: parseErrors(res.error)[0],
          color: "red",
          icon: <X size={18} />,
        });
        setLoading(false)
      } else {
        const arr = polls.filter(e => e.id !== poll.id)
        setPolls([...arr])
        setLoading(false)
      }
    })
  }

  return (
    <div className={classes.flex}>
      <Poll active={false} choice={{ ...poll, num_vote_up: 0 }} />
      <ActionIcon variant="filled" className={classes.actionButton} onClick={() => submit()} loading={loading}>
        <Minus size={14} />
      </ActionIcon>
    </div>
  )
}

const PollEditor = ({ polls, setPolls }: { polls: Poll[], setPolls: (params: any) => void }) => {
  const { classes, cx } = useStyles();
  const notifications = useNotifications();

  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false)

  const submit = () => {
    setLoading(true)
    const data = { text }

    createPoll({ data }).then(res => {
      if (res.error) {
        notifications.showNotification({
          title: "Error creating the poll!",
          message: parseErrors(res.error)[0],
          color: "red",
          icon: <X size={18} />,
        });
        setLoading(false)
      } else {
        setPolls([...polls, res.data])
        setText("")
        setLoading(false)
      }
    })
  }

  return (
    <div className={classes.flex}>
      <TextInput
        size="xs"
        placeholder="Add poll option"
        className={classes.textInput}
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={loading}
        onKeyDown={getHotkeyHandler([
          ['Enter', submit],
        ])}
      />
      <ActionIcon variant="filled" className={classes.actionButton} onClick={() => submit()} loading={loading}>
        <Plus size={14} />
      </ActionIcon>
    </div>
  )
}