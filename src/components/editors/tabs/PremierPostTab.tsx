import { useRef, useState, useEffect } from "react";
import { createStyles, Group, Button, Select, TextInput, Tooltip, List, Text } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { Check, Link, Send, Calendar, AlertCircle } from "tabler-icons-react";
import { PremierDropzone } from "../PremierDropzone";
import dayjs from 'dayjs';
import { CalenderModal } from "../../reusable/modal/CalenderModal";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { createAuthorPost, createSubscriberPost, getChannels, parseErrors } from "../../../helpers";
import { useNotifications } from "@mantine/notifications";
import { ErrorMessage } from "../../reusable/ErrorMessage";

const useStyles = createStyles((theme) => ({
  dropdown: {
    width: 150,
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
  }
}));

interface Props {
  toogle: () => void;
  setLoading: (params: boolean) => void;
}

// TODO Fix this tab
export function PremierPostTab({ toogle, setLoading }: Props) {
  const { author } = useParams<"author">();
  const notifications = useNotifications();
  const queryClient = useQueryClient()

  const { classes, cx } = useStyles();
  const editorRef = useRef<Editor>(null);
  const [showCalender, setShowCalender] = useState(false)
  const [queryKey, setQueryKey] = useState<string[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const [thumbnail, setThumbnail] = useState<number>()
  const [link, setLink] = useState("")
  const [datetime, setDatetime] = useState<Date | null>(null);

  useEffect(() => {
    editorRef?.current?.focus();
    if (author) setQueryKey(["type_posts", author, "premier"])
  }, []);

  const submit = () => {
    setLoading(true)
    setErrors([])
    const data = {
      post_type: 'premier',
      link: link,
      release_time: datetime,
      thumbnail: thumbnail
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
      <PremierDropzone setId={setThumbnail} />
      <TextInput value={link} onChange={e => setLink(e.target.value)} variant="default" className="thick-border" placeholder="Drop premiere link" icon={<Link size={16} />} size="xs" mb="sm" />
      <Group>
        <Tooltip label="Select Premier Time" position="top">
          <Button className={cx(classes.calenderButton, { [classes.activeCalender]: datetime, [classes.inactiveCalender]: !datetime })} leftIcon={<Calendar size={16} />} variant="light" color="gray" size="xs" onClick={() => setShowCalender(true)}>
            {datetime ? dayjs(datetime).format('MMM DD, YYYY  hh:mm A') : "Select Release Time"}
          </Button>
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
