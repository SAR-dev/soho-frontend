import { useState } from "react";
import { createStyles, Image, Center, ActionIcon } from "@mantine/core";
import { ArrowLeft, ArrowRight, Photo } from "tabler-icons-react";
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
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
  }
}));


export function ImageCarousel({sources}: {sources: string[]}) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [viewerProps, setViewerProps] = useState({
    currentIndex: 0,
    views: arrangeImages()
  })

  function next() {
    if (active !== (sources.length - 1)) {
      setActive(active => active + 1)
    }
  }

  function prev() {
    if (active !== 0) {
      setActive(active => active - 1)
    }
  }

  function arrangeImages() {
    return sources.map(x => ({
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
          src={sources[active]}
          onClick={() => openLightbox()}
          alt=""
          radius="sm"
          withPlaceholder
          placeholder={<Center className={classes.placeholder}><Photo size={100} /></Center>}
          style={{ cursor: 'zoom-in' }}
        />
        <div className={cx(classes.rightButton, classes.button)}>
          <ActionIcon variant="filled" onClick={() => next()} disabled={active === (sources.length - 1)}>
            <ArrowRight size={16} />
          </ActionIcon>
        </div>
        <div className={cx(classes.leftButton, classes.button)}>
          <ActionIcon variant="filled" onClick={() => prev()} disabled={active === 0}>
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
