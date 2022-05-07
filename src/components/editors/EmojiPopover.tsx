import { useState } from "react";
import { Popover, Text, Button, Image, ActionIcon } from "@mantine/core";
import { MoodSmile } from "tabler-icons-react";
import { EmojiPicker } from "../reusable/EmojiPicker";
import { useClickOutside } from '@mantine/hooks';

export function EmojiPopover({insertText}:{insertText: any}) {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon variant="filled" onClick={() => setOpened((o) => !o)}>
          <MoodSmile size={16} />
        </ActionIcon>
      }
      width="auto"
      position="right"
      placement="end"
      withArrow
    >
      <div>
        <EmojiPicker
          theme="dark"
          previewPosition="none"
          emojiButtonSize={24}
          emojiSize={16}
          perLine={15}
          onEmojiSelect={(e: any) => insertText(e.native)}
        />
      </div>
    </Popover>
  );
}
