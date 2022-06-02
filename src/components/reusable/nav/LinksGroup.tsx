import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, createStyles } from '@mantine/core';
import { ChevronRight, Hash } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { lighten } from 'color2k';

const useStyles = createStyles((theme) => ({
  control: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
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
    paddingLeft: 31,
    marginLeft: 30,
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
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

export function LinksGroup({ id, color, name, slug, about, sub_categories }: Props) {
  const { classes, theme } = useStyles();
  const hasLinks = sub_categories.length !== 0;
  const [opened, setOpened] = useState(false);
  const items = (hasLinks ? sub_categories : []).map((link, i) => (
    <Text
      component={Link}
      className={classes.link}
      to={""}
      key={i}
    // onClick={(event) => event.preventDefault()}
    >
      {link.name}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0} style={{ width: "100%" }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon style={{backgroundColor: color}}>
              <Hash size={18} color={lighten(color, -.25)} />
            </ThemeIcon>
            <Box ml="md">{name}</Box>
          </Box>
          {hasLinks && (
            <ChevronRight
              className={classes.chevron}
              size={14}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
    </>
  );
}