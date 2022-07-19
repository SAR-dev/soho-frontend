import { useState } from 'react';
import { Box, Collapse, ThemeIcon, Text, createStyles, ActionIcon, Group } from '@mantine/core';
import { ChevronRight, Circle, Hash } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { FaDotCircle } from "react-icons/fa";
import Emoji from "react-emoji-render";
import { Category, SubCategory } from '@interfaces/category';

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
  return (
    <div className={classes.control}>
      <Box sx={{ display: 'flex', alignItems: 'center' }} component={Link} to={`/c/${author}/sch/${sub_category.slug}`} className={classes.cat} >
        <ThemeIcon color="gray" >
          <Hash size={14} />
        </ThemeIcon>
        <Box ml="md">{sub_category.name}</Box>
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
  const { classes, theme } = useStyles();
  const hasLinks = sub_categories.length !== 0;
  const [opened, setOpened] = useState(editing);
  const items = (hasLinks ? sub_categories : []).map((link, i) => (
      <SubChannelHeader author={author} slug={link.slug} name={link.name} key={i} />
  ));

  return (
    <>
      <div className={classes.control} style={{ cursor: "pointer" }} onClick={() => setOpened(!opened)}>
        <ChannelHeader emoji={emoji} name={name} />
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
    </>
  );
}