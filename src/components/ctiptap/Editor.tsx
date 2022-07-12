import { ActionIcon, Center, createStyles, Group, Menu, Text as PText } from "@mantine/core";
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
  PageBreak
} from "tabler-icons-react";
import { FaHeading, FaParagraph, FaRedo, FaUndo } from "react-icons/fa";
import { AiOutlineCode } from "react-icons/ai";
import { MdHorizontalRule } from "react-icons/md";
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
import Highlight from "@tiptap/extension-highlight";
import { EmojiPicker } from "@reusable/EmojiPicker";

const useStyles = createStyles((theme) => ({
  menu: {
    background: theme.colors.dark[6],
    borderRadius: theme.radius.sm
  },
  end: {
    display: "flex",
    justifyContent: "end"
  }
}));

const MenuBar = ({ editor }: { editor: any }) => {
  const { classes, cx } = useStyles();
  if (!editor) {
    return null;
  }

  return (
    <Group spacing="xs" p="sm" mb="sm" className={classes.menu}>
      <ActionIcon
        onClick={() => editor.chain().focus().setParagraph().run()}
        variant="filled"
        color={editor.isActive("paragraph") ? "blue" : "gray"}
      >
        <FaParagraph size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant="filled"
        color={editor.isActive("bold") ? "blue" : "gray"}
      >
        <Bold size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant="filled"
        color={editor.isActive("italic") ? "blue" : "gray"}
      >
        <Italic size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant="filled"
        color={editor.isActive("strike") ? "blue" : "gray"}
      >
        <Strikethrough size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleCode().run()}
        variant="filled"
        color={editor.isActive("code") ? "blue" : "gray"}
      >
        <CodeIcon size={14} />
      </ActionIcon>
      {/* <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </Button> */}
      <ActionIcon
        onClick={() => editor.chain().focus().clearNodes().run()}
        variant="filled"
        color="gray"
      >
        <ClearFormatting size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant="filled"
        color={editor.isActive("heading", { level: 1 }) ? "blue" : "gray"}
      >
        <FaHeading size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant="filled"
        color={editor.isActive("heading", { level: 2 }) ? "blue" : "gray"}
      >
        <Heading size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant="filled"
        color={editor.isActive("bulletList") ? "blue" : "gray"}
      >
        <List size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant="filled"
        color={editor.isActive("orderedList") ? "blue" : "gray"}
      >
        <ListNumbers size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant="filled"
        color={editor.isActive("codeblock") ? "blue" : "gray"}
      >
        <AiOutlineCode size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant="filled"
        color={editor.isActive("blockquote") ? "blue" : "gray"}
      >
        <Blockquote size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        variant="filled"
      >
        <MdHorizontalRule size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().setHardBreak().run()}
        variant="filled"
      >
        <PageBreak size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().undo().run()}
        variant="filled"
      >
        <FaUndo size={14} />
      </ActionIcon>
      <ActionIcon
        onClick={() => editor.chain().focus().redo().run()}
        variant="filled"
      >
        <FaRedo size={14} />
      </ActionIcon>
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
          emojiButtonSize={30}
          emojiSize={24}
          perLine={10}
          onEmojiSelect={(e: any) => editor.commands.insertContent(e.native)}
        />
      </Menu>
    </Group>
  );
};

export function Editor({ text, setText, limit=5000 }: { text: string, setText: (params: string) => void, limit?: number }) {
  const { classes, cx } = useStyles();
  // const limit = 1000;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Text,
      Paragraph,
      Typography,
      SmilieReplacer,
      Code,
      Highlight,
      CharacterCount.configure({
        limit
      })
    ],
    content: text,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setText(html);
    }
  });

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  const getColor = () => {
    if (percentage <= 25) return "#12B886"
    else if (percentage <= 50) return "#15AABF"
    else if (percentage <= 75) return "#F76707"
    else if (percentage <= 100) return "#E64980"
    else return "#C92A2A"
  }

  return (
    <div>
      <MenuBar editor={editor} />
      <div className={cx(classes.menu, "markdown-body-dark")}>
        <EditorContent editor={editor} />
      </div>
      {editor && (
        <div className={classes.end}>
          <Center mt="xs">
            <svg width="16" height="16" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#5C5F66" strokeWidth="20" />
              <circle strokeDasharray={100} strokeDashoffset={`calc(${100 - percentage})`} cx="60" cy="60" r="54" fill="none" stroke={getColor()} strokeWidth="12" pathLength="100" />
            </svg>
            <PText size="xs" weight={600} ml={5} color={getColor()}>
              {editor.storage.characterCount.characters()}/{limit} characters
            </PText>
          </Center>
        </div>
      )}
    </div>
  );
};
