import { useMemo, useState, useEffect } from "react";
import { createStyles } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  editor: {
    width: "100%",
    marginBottom: theme.spacing.sm,
    borderWidth: 2,
    borderStyle: "solid",
  },
  active: {
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.blue[8]
        : theme.colors.blue[5],
  },
  inactive: {
    borderColor:
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[4],
  },
}));

const initialValue = "";

interface Props {
  editorRef: any;
  focus?: boolean
}

export function TextEditor({ editorRef, focus = true }: Props) {
  const [text, setText] = useState(initialValue);
  const [active, setActive] = useState(false);
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (focus) {
      editorRef?.current?.focus();
    }
  }, []);

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
      source: async (
        searchTerm: string,
        renderList: (arg0: { id: number; value: string }[]) => void
      ) => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const result = response.data.map(
          (item: { id: number; name: string }) => {
            return { id: item.id, value: item.name };
          }
        );
        renderList(result);
      },
    }),
    []
  );

  return (
    <>
      <RichTextEditor
        value={text}
        onChange={setText}
        className={cx(classes.editor, "post-editor", {
          [classes.active]: active,
          [classes.inactive]: !active,
        })}
        ref={editorRef}
        mentions={mentions}
        placeholder="Start typing here...."
        spellCheck={false}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        controls={[
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code"],
          ["unorderedList", "orderedList"],
          ["alignLeft", "alignCenter", "alignRight"],
          ["clean"],
        ]}
      />
    </>
  );
}
