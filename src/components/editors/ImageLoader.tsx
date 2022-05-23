import { useEffect, useState } from "react";
import {
  useMantineTheme,
  createStyles,
  Image,
  LoadingOverlay,
} from "@mantine/core";
import axios from "axios";

const IMG_H = 60;

const useStyles = createStyles((theme) => ({
  imageWrapper: {
    position: "relative",
    height: IMG_H,
  },
}));

export function ImageLoader({ img }: { img: File }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState<any>();

  const toBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    setLoading(true);
    (async () => {
      const url = await toBase64(img);
      setSrc(url);
      var formData = new FormData();
      formData.append("image", img);
      await axios
        .post(
          `https://api.imgbb.com/1/upload?expiration=600&key=613ee68f6bc89f194d175614a4ca500f`,
          formData,
          {
            headers: {
              accept: "application/json",
              "Content-Type": `multipart/form-data;`,
            },
          }
        )
        .then((res) => {
          setSrc(res.data.data.image.url);
          setLoading(false);
        });
    })();
  }, [img]);

  return (
    <div className={classes.imageWrapper}>
      <Image src={src} radius="sm" height={IMG_H} width="100%" fit="cover" />
      <LoadingOverlay visible={loading} />
    </div>
  );
}
