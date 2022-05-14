import {
  Paper,
  createStyles,
  SimpleGrid,
  Group,
  Avatar,
  Text,
  Badge,
} from "@mantine/core";
import { useState } from "react";

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
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[3],
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[4],
  },
  badgeText: {
    marginLeft: "auto",
  },
  clapIcon: {
    marginRight: 3,
  },
}));

const users = [
  {
    name: "Robert Wolfkisser",
    nickname: "Shining Saber",
    badge: "https://i.ibb.co/XWzDYzv/5nswjpyy44551-Ally.png",
  },
  {
    name: "Jill Jailbreaker",
    nickname: "Mr Wholesome",
    badge: "https://i.ibb.co/HCZsgfk/award-gold-large.png",
  },
  {
    name: "Henry Silkeater",
    nickname: "Playgirl",
    badge: "https://i.ibb.co/VW5gcr7/community-Icon-2cbkzwfs6kr21.png",
  },
  {
    name: "Bill Horsefighter",
    nickname: "Snoop Dog",
    badge:
      "https://i.ibb.co/zJsXMyk/V9-EFxka-Q0-Gf-Kon-Wyn3gjimsn-AMh3-SPXFQe-Ikp-Kn-NP7-Y.webp",
  },
  {
    name: "Jeremy Footviewer",
    nickname: "Justice Crash",
    badge: "https://i.ibb.co/khSjn40/u8s1fub2ie811.png",
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
          <div className={classes.userCard} key={i}>
            <Group spacing="sm">
              <Avatar
                size={35}
                src={`https://avatars.dicebear.com/api/micah/${user.name}.svg`}
                radius={35}
                className={classes.avatar}
              />
              <div>
                <Text size="xs" weight={500}>
                  {user.name}
                </Text>
                <Text color="dimmed" style={{ fontSize: 12 }}>
                  @username
                </Text>
              </div>
            </Group>
            <Badge className={classes.badgeText} size="sm" radius="sm">
              {user.nickname}
            </Badge>
          </div>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
