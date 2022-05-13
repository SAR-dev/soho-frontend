import {
  Paper,
  SegmentedControl,
  createStyles,
  List,
  ThemeIcon,
  SimpleGrid,
  Group,
  Avatar,
  Text,
  Badge,
} from "@mantine/core";
import { CircleCheck, CircleDashed } from "tabler-icons-react";
import { MdWavingHand } from "react-icons/md";

const useStyles = createStyles((theme) => ({
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
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    padding: theme.spacing.xs,
    borderRadius: theme.spacing.xs,
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
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
  },
  badge: {
    marginLeft: "auto",
  },
  clapIcon: {
      marginRight: 3
  }
}));

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

  return (
    <Paper className={classes.wrapper}>
      <Text size="xs" color="dimmed" align="center">
        Top Contributors
      </Text>
      <SegmentedControl
        data={[
          { label: "Daily", value: "daily" },
          { label: "Weekly", value: "weekly" },
          { label: "Monthly", value: "monthly" },
          { label: "Yearly", value: "yearly" },
        ]}
        className={classes.menus}
      />
      <SimpleGrid cols={1} spacing="md">
        {users.map((user, i) => (
          <div className={classes.userCard}>
            <Group spacing="sm">
              <Avatar
                size={30}
                src={`https://avatars.dicebear.com/api/micah/${user.name}.svg`}
                radius={30}
                className={classes.avatar}
              />
              <div>
                <Text size="xs" weight={500}>
                  {user.name}
                </Text>
                <Text size="xs" color="dimmed">
                  {user.username}
                </Text>
              </div>
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
