import {
  FullScreenDropzone,
  IMAGE_MIME_TYPE,
  MIME_TYPES,
} from "@mantine/dropzone";
import {
  Text,
  useMantineTheme,
  createStyles,
  Center,
  SimpleGrid,
  Image,
  Loader,
  LoadingOverlay,
  ActionIcon,
  Group,
} from "@mantine/core";
import { dropzoneChildren } from "./dropzoneChildren";
import { InfoCircle, Plus } from "tabler-icons-react";
import axios from "axios";
import { asyncForEach } from "../../helpers";
import { useRef, useState } from "react";
import { ImageLoader } from "./ImageLoader";

const IMG_H = 60;

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: theme.spacing.xs,
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
        {sources.length !== 0 &&
          sources.map((img, i) => <ImageLoader images={images} addImage={addImage} img={img} key={i} />)}
        {sources.length !== 0 && (
          <ActionIcon
            size={IMG_H}
            variant="filled"
            onClick={() => fileRef?.current?.click()}
          >
            <Plus />
          </ActionIcon>
        )}
      </Group>
      <Center
        inline
        className={classes.footer}
        onClick={() => fileRef?.current?.click()}
      >
        <InfoCircle size={16} className={classes.icon} />
        <Text color="dimmed" size="xs">
          Click here to start uploading or drag image anywhere
        </Text>
      </Center>
      <input
        ref={fileRef}
        onChange={handleChange}
        multiple
        type="file"
        accept="image/*"
        hidden
      />
      <FullScreenDropzone
        disabled={disabled}
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => {
          uploadFiles(files);
        }}
      >
        {(status) => dropzoneChildren(status, theme)}
      </FullScreenDropzone>
    </>
  );
}
