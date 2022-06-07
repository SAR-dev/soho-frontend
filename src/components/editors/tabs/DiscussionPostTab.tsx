import { useRef, useState, useEffect } from "react";
import { createStyles, Group, Switch, Button, Select } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { ImageDropzone } from "../ImageDropzone";
import { Check, Eye, Hash, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import { TextEditor } from "../TextEditor";

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

export function DiscussionPostTab({ toogle, setLoading }: Props) {
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
      category: '',
      sub_category: '',
      post_type: 'post'
    }
  }

  return (
    <>
      <TextEditor editorRef={editorRef} text={text} setText={setText} />
      <Group>
        <EmojiPopover insertText={insertText} />
        <Select
          placeholder="Channel"
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
          placeholder="Sub-Channel"
          data={[
            { value: "1", label: "Public" },
            { value: "2", label: "Closed" },
            { value: "3", label: "Private" },
          ]}
          icon={<Eye size={16} />}
          searchable
          nothingFound="No options"
          value={sub_category}
          onChange={(e) => set_sub_category(e)}
          size="xs"
          className={classes.dropdown}
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
