import { useState } from "react";
import { Popover, Text, Button, Image, ActionIcon } from "@mantine/core";
import { MoodSmile } from "tabler-icons-react";
import { EmojiPicker } from "../reusable/EmojiPicker";
import { useClickOutside } from '@mantine/hooks';

export function EmojiPopover() {
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
          onEmojiSelect={(e: any) => console.log(e)}
        />
      </div>
    </Popover>
  );
}
