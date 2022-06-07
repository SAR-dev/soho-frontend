import { useEffect, useState } from "react";
import {
  useMantineTheme,
  createStyles,
  Image,
  LoadingOverlay,
} from "@mantine/core";
import axios from "axios";
import { imageUploader, toBase64 } from "../../helpers";
import { useNotifications } from "@mantine/notifications";
import { X } from "tabler-icons-react";

const IMG_H = 60;

const useStyles = createStyles((theme) => ({
  imageWrapper: {
    position: "relative",
    height: IMG_H,
  },
}));

export function ImageLoader({ img }: { img: File }) {
  const notifications = useNotifications();
  const { classes, cx } = useStyles();
  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState<any>();
  const [id, setId] = useState()

  useEffect(() => {
    setLoading(true);
    (async () => {
      const url = await toBase64(img);
      setSrc(url);
      imageUploader(img).then(res => {
        if (res.error) {
          notifications.showNotification({
            title: `Error ${res.error.response.status}`,
            message: res.error.response.data.detail,
            color: "red",
            icon: <X size={18} />,
          });
        } else {
          setSrc(res.data.image);
          setId(res.data.id);
          setLoading(false);
        }
      })
    })();
  }, [img]);

  return (
    <div className={classes.imageWrapper}>
      <Image src={src} radius="sm" height={IMG_H} width="100%" fit="cover" />
      <LoadingOverlay visible={loading} />
    </div>
  );
}
