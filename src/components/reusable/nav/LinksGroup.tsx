import { useState } from 'react';
import { Box, Collapse, ThemeIcon, Text, createStyles, ActionIcon } from '@mantine/core';
import { ChevronRight, Hash } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

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
  color: string;
  name: string;
  slug: string;
  about: null;
  sub_categories: SubCategory[];
  author?: string;
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

export function LinksGroup({ id, color, name, slug, about, sub_categories, author }: Props) {
  const { classes, theme } = useStyles();
  const hasLinks = sub_categories.length !== 0;
  const [opened, setOpened] = useState(false);
  const items = (hasLinks ? sub_categories : []).map((link, i) => (
    <Text
      component={Link}
      className={classes.link}
      to={`/c/${author}/sch/${link.slug}`}
      key={i}
    >
      {link.name}
    </Text>
  ));

  return (
    <>
      <div className={classes.control}>
        <Box sx={{ display: 'flex', alignItems: 'center' }} component={Link} to={`/c/${author}/ch/${slug}`} className={classes.cat} >
          <ThemeIcon color="gray" >
            <Hash size={18} />
          </ThemeIcon>
          <Box ml="md">{name}</Box>
        </Box>
        {hasLinks && (
          <ActionIcon size={18} variant="default" onClick={() => setOpened(!opened)}>
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