import { useState, useCallback } from "react";
import {
  createStyles,
  Image,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Spoiler,
  Anchor,
  SegmentedControl,
  Center,
  Box,
  Chip,
  Button,
  ActionIcon,
} from "@mantine/core";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";
import Carousel, { Modal, ModalGateway } from "react-images";

const useStyles = createStyles((theme, _params, getRef) => ({
  button: {
    ref: getRef("button"),
    position: "absolute",
    top: 0,
    height: "100%",
    display: "flex",
    alignItems: "center",
    opacity: 0,
    transition: "width 300ms ease-in-out",
  },
  wrapper: {
    position: "relative",
    marginBottom: theme.spacing.lg,
    [`&:hover .${getRef("button")}`]: {
      opacity: 1,
    },
  },
  leftButton: {
    left: 0,
    marginLeft: theme.spacing.xs,
  },
  rightButton: {
    right: 0,
    marginRight: theme.spacing.xs,
  },
}));

const images = [
  "https://i.ibb.co/whrrZ5q/sad-miku-1a.jpg",
  "https://i.ibb.co/kQMzz5Q/954561.jpg",
  "https://i.ibb.co/GPJ33dB/wp6887295-the-daily-life-of-the-immortal-king-wallpapers.png",
  "https://i.ibb.co/f2FT3tw/wp6887359-the-daily-life-of-the-immortal-king-wallpapers.jpg",
];

export function ImageCarousel() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(0)
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [viewerProps, setViewerProps] = useState({
    currentIndex: 0,
    views: arrangeImages()
  })

  function next() {
    if (active !== (images.length - 1)) {
      setActive(active => active + 1)
    }
  }

  function prev() {
    if (active !== 0) {
      setActive(active => active - 1)
    }
  }

  function arrangeImages() {
    return images.map(x => ({
      source: x
    }))
  }

  const openLightbox = () => {
    setViewerProps(prevState => ({
      ...prevState,
      currentIndex: active,
    }))
    setViewerIsOpen(true);
  }

  const closeLightbox = () => {
    setViewerProps(prevState => ({
      ...prevState,
      currentIndex: 0,
    }))
    setViewerIsOpen(false);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Image
          width="100%"
          height={350}
          src={images[active]}
          onClick={() => openLightbox()}
          alt=""
          radius="sm"
          withPlaceholder
          style={{cursor: 'zoom-in'}}
        />
        <div className={cx(classes.rightButton, classes.button)}>
          <ActionIcon variant="filled" onClick={() => next()}>
            <ArrowRight size={16} />
          </ActionIcon>
        </div>
        <div className={cx(classes.leftButton, classes.button)} onClick={() => prev()}>
          <ActionIcon variant="filled">
            <ArrowLeft size={16} />
          </ActionIcon>
        </div>
      </div>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel {...viewerProps} />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
}
