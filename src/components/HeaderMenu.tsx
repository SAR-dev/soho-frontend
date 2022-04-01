import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Text,
  Badge,
  ThemeIcon
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { SmartHome, Notification } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
  },
  linkText: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700
  },
  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    marginLeft: "auto",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

const links = [
  { icon: SmartHome, label: "Home", link: "" },
  { icon: Notification, label: "Notofications", link: "" },
];

export function HeaderMenu() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  const items = links.map((link) => {
    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        <ThemeIcon variant="light">
              <Icon size={18} />
            </ThemeIcon>
      </a>
    );
  });

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Badge size="lg" radius="md" leftSection={"#"}>FEED</Badge>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
      </div>
    </Header>
  );
}
