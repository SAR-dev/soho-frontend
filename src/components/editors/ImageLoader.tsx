import { useEffect, useState } from "react";
import {
  useMantineTheme,
  createStyles,
  Image,
  LoadingOverlay,
} from "@mantine/core";
import axios from "axios";
import { imgBBuploader, toBase64 } from "../../helpers";
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

  useEffect(() => {
    setLoading(true);
    (async () => {
      const url = await toBase64(img);
      setSrc(url);
      imgBBuploader(img).then(data => {
        if (data.error) {
          notifications.showNotification({
            title: `Error ${data.error.code}`,
            message: data.error.message,
            color: 'red',
            icon: <X size={18} />
          })
        } else {
          setSrc(data);
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
