import { ActionIcon, ColorPicker, createStyles, Group, Menu, Tooltip } from "@mantine/core";
import {
  Bold,
  Italic,
  Strikethrough,
  Code as CodeIcon,
  ClearFormatting,
  Heading,
  List,
  ListNumbers,
  Blockquote,
  Underline as UnderlineText
} from "tabler-icons-react";
import { FaHeading, FaHighlighter, FaParagraph, FaRedo, FaUndo } from "react-icons/fa";
import { MdFormatColorText } from "react-icons/md";
import { BsEmojiSunglasses } from "react-icons/bs";
import "./editor.css";
import "./emojiPicker.css";
import { SmilieReplacer } from "./SmileReplacer";
import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Typography from "@tiptap/extension-typography";
import Code from "@tiptap/extension-code";
import Underline from '@tiptap/extension-underline'
import Highlight from "@tiptap/extension-highlight";
import Gapcursor from '@tiptap/extension-gapcursor'
import Link from "@tiptap/extension-link";
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { EmojiPicker } from "@reusable/EmojiPicker";

const useStyles = createStyles((theme) => ({
  menu: {
    background: theme.colors.dark[6],
    borderRadius: theme.radius.sm
  },
  wrapper: {
    marginBottom: theme.spacing.sm
  }
}));

const MenuBar = ({ editor, minimal=false }: { editor: any, minimal?: boolean}) => {
  const { classes, cx } = useStyles();
  if (!editor) {
    return null;
  }

  return (
    <Group spacing="xs" p="sm" mb="sm" className={classes.menu}>
      <Tooltip label="Paragraph" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().setParagraph().run()}
          variant="filled"
          color={editor.isActive("paragraph") ? "blue" : "gray"}
        >
          <FaParagraph size={14} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Bold" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant="filled"
          color={editor.isActive("bold") ? "blue" : "gray"}
        >
          <Bold size={14} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Underline" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant="filled"
          color={editor.isActive("underline") ? "blue" : "gray"}
        >
          <UnderlineText size={14} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Italic or Curved" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant="filled"
          color={editor.isActive("italic") ? "blue" : "gray"}
        >
          <Italic size={14} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Strikethrough" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant="filled"
          color={editor.isActive("strike") ? "blue" : "gray"}
        >
          <Strikethrough size={14} />
        </ActionIcon>
      </Tooltip>
      {!minimal && (
      <Tooltip label="Code" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleCode().run()}
          variant="filled"
          color={editor.isActive("code") ? "blue" : "gray"}
        >
          <CodeIcon size={14} />
        </ActionIcon>
      </Tooltip>
      )}
      {/* <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </Button> */}
      {!minimal && (
      <Tooltip label="Main heading" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          variant="filled"
          color={editor.isActive("heading", { level: 1 }) ? "blue" : "gray"}
        >
          <FaHeading size={14} />
        </ActionIcon>
      </Tooltip>
      )}
      {!minimal && (
      <Tooltip label="Sub heading" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant="filled"
          color={editor.isActive("heading", { level: 2 }) ? "blue" : "gray"}
        >
          <Heading size={14} />
        </ActionIcon>
      </Tooltip>
      )}
      <Tooltip label="Bullet list" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant="filled"
          color={editor.isActive("bulletList") ? "blue" : "gray"}
        >
          <List size={14} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Ordered list" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant="filled"
          color={editor.isActive("orderedList") ? "blue" : "gray"}
        >
          <ListNumbers size={14} />
        </ActionIcon>
      </Tooltip>
      {/* <Tooltip label="Multiline Code" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant="filled"
          color={editor.isActive("codeblock") ? "blue" : "gray"}
        >
          <AiOutlineCode size={14} />
        </ActionIcon>
      </Tooltip> */}
      {!minimal && (
      <Tooltip label="Blockquote" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant="filled"
          color={editor.isActive("blockquote") ? "blue" : "gray"}
        >
          <Blockquote size={14} />
        </ActionIcon>
      </Tooltip>
      )}
      {/* <Tooltip label="Horizontal line" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          variant="filled"
        >
          <MdHorizontalRule size={14} />
        </ActionIcon>
      </Tooltip> */}
      {/* <Tooltip label="Line break" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().setHardBreak().run()}
          variant="filled"
        >
          <PageBreak size={14} />
        </ActionIcon>
      </Tooltip> */}
      {/* <Tooltip label="Highlighter" position="top">
        <Menu control={
          <ActionIcon variant="filled">
            <FaHighlighter size={14} />
          </ActionIcon>
        }>
          <ColorPicker format="rgb" onChange={e => editor.chain().focus().toggleHighlight({ color: e }).run()} />
        </Menu>
      </Tooltip> */}
      <Tooltip label="Text Color" position="top">
        <Menu control={
          <ActionIcon variant="filled">
            <MdFormatColorText size={14} />
          </ActionIcon>
        }>
          <ColorPicker format="rgb" onChange={e => editor.chain().focus().setColor(e).run()} />
        </Menu>
      </Tooltip>
      <Tooltip label="Emoji" position="top">
        <Menu
          control={
            <ActionIcon variant="filled">
              <BsEmojiSunglasses size={14} />
            </ActionIcon>
          }
        >
          <EmojiPicker
            theme="dark"
            previewPosition="none"
            onEmojiSelect={(e: any) => editor.commands.insertContent(e.native)}
          />
        </Menu>
      </Tooltip>
      <Tooltip label="Clear styles" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().clearNodes().run()}
          variant="filled"
          color="gray"
        >
          <ClearFormatting size={14} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Undo" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().undo().run()}
          variant="filled"
        >
          <FaUndo size={14} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Redo" position="top">
        <ActionIcon
          onClick={() => editor.chain().focus().redo().run()}
          variant="filled"
        >
          <FaRedo size={14} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export function Editor({ text, setText, limit = 5000, minimal=false }: { text: string, setText: (params: string) => void, limit?: number, minimal?: boolean }) {
  const { classes, cx } = useStyles();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Text,
      Paragraph,
      Typography,
      SmilieReplacer,
      Code,
      Gapcursor,
      Link,
      Color,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
      CharacterCount.configure({
        limit
      }),
      Underline
    ],
    content: text,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setText(html);
    }
  });

  return (
    <div className={classes.wrapper}>
      <MenuBar editor={editor} minimal={minimal} />
      <div className={cx(classes.menu, "markdown-body-dark")}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
