import { FullScreenDropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useMantineTheme, createStyles, ActionIcon, Group } from "@mantine/core";
import { dropzoneChildren } from "./dropzoneChildren";
import { useRef, useState } from "react";
import { ImageLoader } from "./ImageLoader";
import { RiImageAddFill } from "react-icons/ri";

const IMG_H = 60;

const useStyles = createStyles((theme) => ({
  footer: {
    cursor: "pointer",
  },
  icon: {
    marginRight: 3,
  },
  imageWrapper: {
    position: "relative",
    height: IMG_H,
  },
}));

interface Props {
  disabled: boolean;
  images: Array<number>;
  addImage: (id: number) => void;
}

export function ImageDropzone({ disabled, images, addImage }: Props) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const [sources, setSources] = useState<File[]>([]);

  const handleChange = (e: any) => {
    const files = [...e.target.files];
    setSources([...sources, ...files]);
  };

  const uploadFiles = (files: File[]) => {
    setSources([...sources, ...files]);
  };

  return (
    <>
      <Group spacing="sm" className={classes.footer}>
        {sources.map((img, i) => <ImageLoader images={images} addImage={addImage} img={img} key={i} />)}
        <ActionIcon
          size={IMG_H}
          variant="filled"
          onClick={() => fileRef?.current?.click()}
        >
          <RiImageAddFill size={30} />
        </ActionIcon>
      </Group>
      <FullScreenDropzone
        disabled={disabled}
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => {
          uploadFiles(files);
        }}
      >
        {(status) => dropzoneChildren(status, theme)}
      </FullScreenDropzone>
      <input
          ref={fileRef}
          onChange={handleChange}
          multiple
          type="file"
          accept="image/*"
          hidden
        />
    </>
  );
}
