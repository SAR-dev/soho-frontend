import { useRef, useState } from 'react';
import { Box, Collapse, ThemeIcon, Text, createStyles, ActionIcon } from '@mantine/core';
import { ChevronRight, DragDrop2, Hash } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import Emoji from "react-emoji-render";
import { SubCategory } from '@interfaces/category';
import { useDrop, useDrag } from 'ahooks';
import { capitalizeFirstLetter } from 'src/helpers';

const useStyles = createStyles((theme) => ({
  control: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
  },

  cat: {
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 25,
    marginLeft: 25,
    width: "auto",
    textAlign: "left",
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
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
}));

export interface Props {
  id: number;
  emoji: string;
  name: string;
  slug: string;
  about: null;
  sub_categories: SubCategory[];
  author?: string;
  editing: boolean;
}

export function SubChannelLinksGroup({ sub_category, author }: { sub_category: SubCategory, author?: string }) {
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
    <div className={classes.control} ref={dragRef}>
      <Box sx={{ display: 'flex', alignItems: 'center' }} component={Link} to={`/c/${author}/sch/${sub_category.slug}`} className={classes.cat} >
        <ThemeIcon color="gray" >
          <Hash size={14} />
        </ThemeIcon>
        <Box ml="md">{dragging ? "Dragging" : sub_category.name}</Box>
      </Box>
    </div>
  )
}

export function ChannelHeader({ emoji, name }: { emoji: string, name: string }) {
  const { classes, theme } = useStyles();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} className={classes.cat} >
      <ThemeIcon color="gray" >
        <Text><Emoji text={emoji} /></Text>
      </ThemeIcon>
      <Box ml="md">{name}</Box>
    </Box>
  )
}

export function SubChannelHeader({ author, slug, name }: { author?: string, slug: string, name: string }) {
  const { classes, theme } = useStyles();
  return (
    <Text
      component={Link}
      className={classes.link}
      to={`/c/${author}/sch/${slug}`}
    >
      {name}
    </Text>
  )
}

export function ChannelLinksGroup({ id, emoji, name, slug, about, sub_categories, author, editing }: Props) {
  const { classes, cx, theme } = useStyles();
  const hasLinks = sub_categories.length !== 0;
  const [opened, setOpened] = useState(editing);
  const [isHovering, setIsHovering] = useState(false);

  const dropRef = useRef(null);

  const items = (hasLinks ? sub_categories : []).map((link, i) => (
    <SubChannelHeader author={author} slug={link.slug} name={link.name} key={i} />
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
    <>
      <div className={classes.control} style={{ cursor: "pointer" }} onClick={() => setOpened(!opened)}>
        <ChannelHeader emoji={emoji} name={capitalizeFirstLetter(name)} />
        {hasLinks && (
          <ActionIcon size={18} variant="default">
            <ChevronRight
              className={classes.chevron}
              size={14}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          </ActionIcon>
        )}
      </div>
      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
      {editing && (
        <Text
          className={cx(classes.placeholder, { [classes.inactive]: !isHovering }, { [classes.active]: isHovering })}
          ref={dropRef}
        >
          <DragDrop2 size={16} style={{ marginRight: 5 }} />
          {isHovering ? 'Release here' : 'Drop here'}
        </Text>
      )}
    </>
  );
}