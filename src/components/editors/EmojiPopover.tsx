import { ActionIcon, Menu } from "@mantine/core";
import { MoodSmile } from "tabler-icons-react";
import { EmojiPicker } from "../reusable/EmojiPicker";

export function EmojiPopover({ insertText }: { insertText: any }) {

  return (
    <Menu
      control={<ActionIcon variant="filled">
        <MoodSmile size={16} />
      </ActionIcon>}
      size="auto"
      position="right"
      >
      <Menu.Label>Select Emoji</Menu.Label>
      <Menu.Item>
        <EmojiPicker
          theme="dark"
          previewPosition="none"
          emojiButtonSize={24}
          emojiSize={16}
          perLine={15}
          onEmojiSelect={(e: any) => insertText(e.native)}
        />
      </Menu.Item>
    </Menu>
  );
}
