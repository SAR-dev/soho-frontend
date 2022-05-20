import { FullScreenDropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import {
  Text,
  useMantineTheme,
  createStyles,
  Center,
  SimpleGrid,
  Image,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import { dropzoneChildren } from "./dropzoneChildren";
import { InfoCircle } from "tabler-icons-react";
import axios from "axios";
import { asyncForEach } from "../../helpers";
import { useRef, useState } from "react";

const IMG_H = 60;

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: theme.spacing.xs,
    cursor: 'pointer'
  },
  icon: {
    marginRight: 3,
  },
  imageWrapper: {
    position: "relative",
    height: IMG_H,
  },
}));

export function ImageDropzone({ disabled }: { disabled: boolean }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([
    "https://i.ibb.co/whrrZ5q/sad-miku-1a.jpg",
  ]);

  const handleChange = (e: any) => {
    const [file] = e.target.files;
    console.log(file);
  };

  // const uploadFiles = async (files: any[]) => {
  //   console.log(files)

  //   setSources([...files]);
  //   await asyncForEach(sources, async (item, i) => {
  //     var formData = new FormData();
  //     formData.append("image", item);
  //     await axios
  //       .post(
  //         `https://api.imgbb.com/1/upload?expiration=600&key=613ee68f6bc89f194d175614a4ca500f`,
  //         formData,
  //         {
  //           headers: {
  //             accept: "application/json",
  //             "Content-Type": `multipart/form-data;`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setImages([...res.data]);
  //         console.log(res.data)
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // };
  return (
    <>
      <SimpleGrid cols={8} spacing="sm" className={classes.footer}>
        <div className={classes.imageWrapper}>
          <Image
            src="https://i.ibb.co/whrrZ5q/sad-miku-1a.jpg"
            radius="sm"
            height="100%"
            width="100%"
            fit="cover"
          />
          <LoadingOverlay visible={true} />
        </div>
      </SimpleGrid>
      <Center
        inline
        className={classes.footer}
        onClick={() => fileRef?.current?.click()}
      >
        <InfoCircle size={16} className={classes.icon} />
        <Text color="dimmed" size="xs">
          Click here to start uploading
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
      {/* <FullScreenDropzone
        disabled={disabled}
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => {
          uploadFiles(files);
        }}
      >
        {(status) => dropzoneChildren(status, theme)}
      </FullScreenDropzone> */}
    </>
  );
}
