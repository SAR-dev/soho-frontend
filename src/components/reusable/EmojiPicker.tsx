import { useEffect, useRef } from "react";

import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";

export function EmojiPicker(props: any) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    new Picker({ ...props, data, ref });
  }, []);

  return <div ref={ref} />;
}

{
  /* <EmojiPicker
      theme="dark"
      previewPosition="none"
      onEmojiSelect={(e) => console.log(e)}
    /> */
}
