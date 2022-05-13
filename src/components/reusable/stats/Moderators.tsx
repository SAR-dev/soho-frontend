import {
  Paper,
  SegmentedControl,
  createStyles,
  SimpleGrid,
  Group,
  Avatar,
  Text,
  Badge,
  Center,
} from "@mantine/core";
import { useState } from "react";
import { MdWavingHand } from "react-icons/md";

const useStyles = createStyles((theme) => ({
  header: {
    marginBottom: theme.spacing.xs,
  },
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    padding: theme.spacing.md,
  },
  menus: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xs,
    width: "-webkit-fill-available",
  },
  userCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : "white",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.xs,
    cursor: "pointer",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
    },
  },
  avatar: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },
  badge: {
    marginLeft: "auto",
    textTransform: "none"
  },
  clapIcon: {
    marginRight: 3,
  },
}));

const users = [
  {
    name: "Robert Wolfkisser",
    nickname: "Shining Saber",
  },
  {
    name: "Jill Jailbreaker",
    nickname: "Mr Wholesome",
  },
  {
    name: "Henry Silkeater",
    nickname: "Playgirl",
  },
  {
    name: "Bill Horsefighter",
    nickname: "Snoop Dog",
  },
  {
    name: "Jeremy Footviewer",
    nickname: "Justice Crash",
  },
];

export function Moderators() {
  const { classes } = useStyles();
  const [value, setValue] = useState("1");

  return (
    <Paper className={classes.wrapper}>
      <Text size="xs" color="dimmed" align="center" className={classes.header}>
        Moderators
      </Text>
      <SimpleGrid cols={1} spacing="md">
        {users.map((user, i) => (
          <div className={classes.userCard}>
            <Group spacing="sm">
              <Avatar
                size={20}
                src={`https://avatars.dicebear.com/api/micah/${user.name}.svg`}
                radius={30}
                className={classes.avatar}
              />
              <Text size="xs" weight={500}>
                {user.name}
              </Text>
            </Group>
            <Badge className={classes.badge} size="sm" radius="sm" variant="outline">
              {user.nickname}
            </Badge>
          </div>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
