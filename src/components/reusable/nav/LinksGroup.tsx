import { useRef, useState } from 'react';
import { Box, Collapse, ThemeIcon, Text, createStyles, ActionIcon, Modal, Group, Tooltip } from '@mantine/core';
import { ChevronRight, DragDrop2, Hash, Plus } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import Emoji from "react-emoji-render";
import { SubCategory } from '@interfaces/category';
import { useDrop, useDrag } from 'ahooks';
import { capitalizeFirstLetter } from 'src/helpers';
import { SubChannelCreateForm } from './SubChannelCreateForm';

const useStyles = createStyles((theme) => ({
  control: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    lineHeight: 1,
    color: theme.colors.gray[6],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  collectionLink: {
    display: 'flex',
    alignItems: "center",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  collectionIcon: {
    marginRight: 9, 
    fontSize: 16, 
    width: 22, 
    textAlign: "center"
  },

  placeholder: {
    fontWeight: 500,
    display: 'flex',
    allignItems: "center",
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 25,
    marginLeft: 25,
    width: "auto",
    textAlign: "left",
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    border: `1px dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },

  inactive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
  },

  active: {
    backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.5),
  },

  chevron: {
    transition: 'transform 200ms ease',
  },

  drop: {
    height: 6,
    marginTop: -3,
    marginBottom: -3,
  }
}));

export interface Props {
  id: number;
  name: string;
  slug: string;
  sub_categories: SubCategory[];
  author?: string;
}

export function SubChannel({ sub_category, author }: { sub_category: SubCategory, author?: string }) {
  const { classes, theme } = useStyles();
  const [dragging, setDragging] = useState(false);

  const dragRef = useRef(null);

  useDrag(sub_category, dragRef, {
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(false);
    },
  });

  return (
    <Link to={`/c/${author}/sch/${sub_category.slug}`} className={classes.collectionLink} ref={dragRef}>
      <div className={classes.collectionIcon}>{sub_category.emoji}</div> {sub_category.name}
    </Link>
  )
}

export function ChannelHeader({ name }: { name: string }) {
  const { classes, theme } = useStyles();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className={classes.collectionIcon}><Hash size={14} /></div> {name}
    </div>
  )
}

export function Channel({ id, name, slug, sub_categories, author }: Props) {
  const { classes, cx, theme } = useStyles();
  const hasLinks = sub_categories.length !== 0;
  const [opened, setOpened] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [modal, setModal] = useState(false)

  const dropRef = useRef(null);

  const items = (hasLinks ? sub_categories : []).map((link, i) => (
    <SubChannel author={author} sub_category={link} key={i} />
  ));

  useDrop(dropRef, {
    onText: (text, e) => {
      console.log(e);
      alert(`'text: ${text}' dropped`);
    },
    onFiles: (files, e) => {
      console.log(e, files);
      alert(`${files.length} file dropped`);
    },
    onUri: (uri, e) => {
      console.log(e);
      alert(`uri: ${uri} dropped`);
      setIsHovering(false)
    },
    onDom: (content: string, e) => {
      alert(`custom: ${content} dropped`);
    },
    onDragEnter: () => setIsHovering(true),
    onDragLeave: () => setIsHovering(false),
  });

  return (
    <div>
      <div className={cx(classes.control, { [classes.active]: isHovering })} ref={dropRef}>
        <div style={{ cursor: "pointer", width: "100%" }} onClick={() => setOpened(!opened)}>
          <ChannelHeader name={capitalizeFirstLetter(name)} />
        </div>
        <Tooltip label="Create Soho Here" withArrow position="right">
          <ActionIcon size={18} variant="default" onClick={() => setModal(true)}>
            <Plus size={12} />
          </ActionIcon>
        </Tooltip>
      </div>
      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
      <Modal
        centered
        opened={modal}
        onClose={() => setModal(false)}
        title="Create a Soho"
      >
        <SubChannelCreateForm setOpened={setModal} channel={slug} />
      </Modal>
    </div>
  );
}