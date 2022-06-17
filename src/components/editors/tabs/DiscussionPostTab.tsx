import { useRef, useState, useEffect } from "react";
import { createStyles, Group, Button, Select, List, Text } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { ImageDropzone } from "../ImageDropzone";
import { AlertCircle, Check, Eye, Hash, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import { TextEditor } from "../TextEditor";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { createAuthorPost, createSubscriberPost, getChannels, parseErrors } from "../../../helpers";
import { useNotifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  dropdown: {
    width: 150,
  },
  footerButton: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
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
  is_admin: boolean;
}

interface DataParam {
  data: {
    count: number;
    next: null;
    previous: null;
    results: Result[];
  }
}

interface Result {
  id: number;
  color: string;
  name: string;
  slug: string;
  about: null;
  sub_categories: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface SelectModel {
  label: string;
  value: string;
}

export function DiscussionPostTab({ toogle, setLoading, is_admin }: Props) {
  const { author } = useParams<"author">();
  const { sName } = useParams<"sName">();
  const { cName } = useParams<"cName">();
  const { pType } = useParams<"pType">();
  const notifications = useNotifications();

  const queryClient = useQueryClient()
  const [channels, setChannels] = useState<Result[]>([])
  const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['channels', author], () => getChannels({ username: author }), {
    onSuccess: res => {
      setChannels([...res.data.results])
    }
  })
  const { classes, cx } = useStyles();

  const [text, setText] = useState("");
  const [category, setCategory] = useState<any | null>(null);
  const [sub_category, set_sub_category] = useState<any | null>(null);
  const [checked, setChecked] = useState(false);
  const editorRef = useRef<Editor>(null);
  const [images, setImages] = useState<Array<number>>([])
  const [errors, setErrors] = useState<string[]>([])
  const [queryKey, setQueryKey] = useState<string[]>([])

  useEffect(() => {
    editorRef?.current?.focus();
    if (author && sName) setQueryKey(["sub_cat_posts", author, sName])
    if (author && cName) setQueryKey(["cat_posts", author, cName])
    if ((author && pType)) setQueryKey(["type_posts", author, pType])
    if ((author && !sName && !cName && !pType)) setQueryKey(["type_posts", author, "discussion"])
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

  const submit = () => {
    setLoading(true)
    setErrors([])
    const data = {
      content: text.replace(/<p><br[\/]?><[\/]?p>/g, ''),
      images: images,
      category: category,
      sub_category: sub_category,
      post_type: checked ? 'announcement' : 'discussion'
    }
    if (is_admin) {
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
    } else {
      createSubscriberPost({ username: author, data: data }).then(res => {
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

  }

  const getChannelsList = () => {
    return channels.map(el => {
      return { label: el.name, value: String(el.id) }
    })
  }

  function getSubChannelsList(): SelectModel[] {
    if (category) {
      const ch = channels.find(el => String(el.id) === category)
      if (ch) {
        return ch.sub_categories.map(el => {
          return { label: el.name, value: String(el.id) }
        })
      } else return []

    } else return []
  }

  return (
    <>
      <TextEditor editorRef={editorRef} text={text} setText={setText} insertText={insertText} />
      <ImageDropzone disabled={false} images={images} addImage={addImage} />
      <Group>
        <EmojiPopover insertText={insertText} />
        <Select
          placeholder="Channel"
          data={getChannelsList()}
          icon={<Hash size={16} />}
          nothingFound="No options"
          value={category}
          onChange={(e) => setCategory(e)}
          size="xs"
          className={classes.dropdown}
          disabled={isLoading}
        />
        <Select
          placeholder="Sub-Channel"
          data={getSubChannelsList()}
          icon={<Eye size={16} />}
          nothingFound="No options"
          value={sub_category}
          onChange={(e) => set_sub_category(e)}
          size="xs"
          className={classes.dropdown}
          disabled={isLoading}
        />
        <Button
          size="xs"
          className={cx({ [classes.footerButton]: !checked })}
          color="gray"
          leftIcon={checked && <Check size={16} />}
          onClick={() => setChecked((checked) => !checked)}
        >
          Announcement
        </Button>
        <Button size="xs" ml="auto" color="gray" onClick={() => toogle()}>
          Close
        </Button>
        <Button size="xs" leftIcon={<Send size={16} />} onClick={() => submit()}>
          Submit
        </Button>
      </Group>
      {errors.length !== 0 && (
        <List size="xs" mt="xs" className={classes.errorHolder} icon={
          <AlertCircle size={18} color="yellow" />
        }>
          <Text size="xs" weight={600} color="yellow" mb="xs">Fix these errors</Text>
          {errors.map(e => <List.Item><Text size="xs" weight={600} color="yellow">{e}</Text></List.Item>)}
        </List>
      )}
    </>
  );
}
