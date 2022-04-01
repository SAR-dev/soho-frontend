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
  ThemeIcon,
  ActionIcon,
  Avatar,
  Divider,
  Button,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { SmartHome, Notification, Home2, Settings, Search, Photo, MessageCircle, Trash, ArrowsLeftRight } from 'tabler-icons-react';
import ThemeSwitcher from "./ThemeSwitcher";
import { UserMenu } from "./UserMenu";

const NavHeight = 50

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
    height: NavHeight,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    marginLeft: "auto",
  },

  link: {
    borderRadius: theme.radius.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[3],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][1],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

export function HeaderMenu() {
  const { classes } = useStyles();

  return (
    <Header height={NavHeight} className={classes.header}>
      <div className={classes.inner}>
        <Text className={classes.linkText}>FEED</Text>
        <Group spacing={10} className={classes.links}>
          <Button 
            leftIcon={<Avatar src="https://avatars.dicebear.com/api/micah/seed.svg" size="sm" radius="xl" />} 
            radius="md" 
            variant="light" 
            title="Navigate to Home" 
            className={classes.link}
            style={{paddingLeft: 10, paddingRight: 10}}
            >
            Sayed Rafi
          </Button>
          <ActionIcon radius="md" size="lg" variant="light" title="Navigate to Home" className={classes.link}>
            <Home2 size={18} />
          </ActionIcon>

          <ActionIcon radius="md" size="lg" variant="light" title="Notification Center" className={classes.link}>
            <Notification size={18} />
          </ActionIcon>

          <ThemeSwitcher size={18} />

          <UserMenu />
        </Group>
      </div>
    </Header>
  );
}
