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
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    padding: theme.spacing.md,
  },
  header: {
    marginBottom: theme.spacing.xs,
  },
  menus: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    marginBottom: theme.spacing.md,
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
  },
  clapIcon: {
    marginRight: 3,
  },
}));

const times = [
  { key: "1", name: "Daily" },
  { key: "7", name: "Weekly" },
  { key: "30", name: "Monthly" },
];

const users = [
  {
    name: "Robert Wolfkisser",
    username: "@rob_wolf",
  },
  {
    name: "Jill Jailbreaker",
    username: "@jj",
  },
  {
    name: "Henry Silkeater",
    username: "@henry",
  },
  {
    name: "Bill Horsefighter",
    username: "@bhorsefighter",
  },
  {
    name: "Jeremy Footviewer",
    username: "@jeremy",
  },
];

export function TopClaps() {
  const { classes } = useStyles();
  const [value, setValue] = useState("1");

  return (
    <Paper className={classes.wrapper}>
      <Text size="xs" color="dimmed" align="center" className={classes.header}>
        Top Contributors
      </Text>
      <SegmentedControl
        value={value}
        onChange={setValue}
        color="gray"
        size="sm"
        data={times.map((el) => ({
          label: (
            <Center py={2}>
              <Text size="xs">{el.name}</Text>
            </Center>
          ),
          value: el.key,
        }))}
        className={classes.menus}
      />
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
            <Badge className={classes.badge}>
              <MdWavingHand className={classes.clapIcon} />
              34
            </Badge>
          </div>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
