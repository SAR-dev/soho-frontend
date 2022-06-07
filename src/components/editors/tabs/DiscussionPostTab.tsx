import { useRef, useState, useEffect } from "react";
import { createStyles, Group, Button, Select } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { ImageDropzone } from "../ImageDropzone";
import { Check, Eye, Hash, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import { TextEditor } from "../TextEditor";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getChannels } from "../../../helpers";

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
}));

interface Props {
  toogle: () => void;
  setLoading: (params: boolean) => void;
}

interface DataParam {
  count: number;
  next: null;
  previous: null;
  results: Result[];
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

export function DiscussionPostTab({ toogle, setLoading }: Props) {
  const { author } = useParams<"author">();
  const [channels, setChannels] = useState<Result[]>([])
  const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['channels', author], () => getChannels(author), {
    onSuccess: data => {
      setChannels([...data.results])
    }
  })
  const { classes, cx } = useStyles();
  const [text, setText] = useState("");
  const [category, setCategory] = useState<any | null>(null);
  const [sub_category, set_sub_category] = useState<any | null>(null);
  const [checked, setChecked] = useState(false);
  const editorRef = useRef<Editor>(null);
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

  const submit = () => {
    setLoading(true)
    const data = {
      content: text,
      images: images,
      category: category,
      sub_category: sub_category,
      post_type: 'post'
    }
    console.log(data)
    setLoading(false)
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
      <TextEditor editorRef={editorRef} text={text} setText={setText} />
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
      <ImageDropzone disabled={false} images={images} addImage={addImage} />
    </>
  );
}
