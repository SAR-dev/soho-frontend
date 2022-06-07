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
import Carousel, { Modal, ModalGateway } from "react-images";

const IMG_H = 60;

const useStyles = createStyles((theme) => ({
  imageWrapper: {
    position: "relative",
    height: IMG_H,
  },
}));

interface Props {
  img: File;
  images: Array<number>;
  addImage: (id: number) => void;
}

export function ImageLoader({ img, images, addImage }: Props) {
  const notifications = useNotifications();
  const { classes, cx } = useStyles();

  const [loading, setLoading] = useState(false);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [src, setSrc] = useState<any>();

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
          addImage(res.data.id)
          setLoading(false);
        }
      })
    })();
  }, [img]);

  return (
    <div className={classes.imageWrapper}>
      <Image src={src} radius="sm" height={IMG_H} width="100%" fit="cover" onClick={() => setViewerIsOpen(true)} />
      <LoadingOverlay visible={loading} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={() => setViewerIsOpen(false)}>
            <Carousel currentIndex={0} views={[{ source: src }]} />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
