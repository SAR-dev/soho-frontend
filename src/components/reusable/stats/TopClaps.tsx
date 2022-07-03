import { LeaderboardDataParam } from "@interfaces/leaderboard";
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
  Skeleton,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import { MdWavingHand } from "react-icons/md";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getLeaderboard, shortenText } from "src/helpers";

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
  badge: {
    marginLeft: "auto",
  },
  clapIcon: {
    marginRight: 3,
  },
}));

const times = [
  { value: "weekly", name: "Weekly" },
  { value: "monthly", name: "Monthly" },
  { value: "alltime", name: "All-time" },
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

export interface DataParam {
  data: {
    count: number;
    next: null;
    previous: null;
    results: LeaderboardDataParam[];
  }
}

export function TopClaps() {
  const { classes } = useStyles();
  const { author } = useParams<"author">();
  const [value, setValue] = useState(times[0].value);

  const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['leaderboard', author, value], () => getLeaderboard({ username: author, timespan: value }))

  const LeaderBoardWrapper = ({ children }: { children: ReactNode }) => (
    <Paper className={classes.wrapper}>
      <Text size="xs" color="dimmed" align="center" className={classes.header}>
        Top Contributors
      </Text>
      <SegmentedControl
        value={value}
        onChange={setValue}
        color="dark"
        size="sm"
        data={times.map((el) => ({
          label: (
            <Center py={2}>
              <Text size="xs">{el.name}</Text>
            </Center>
          ),
          value: el.value,
        }))}
        className={classes.menus}
      />
      <SimpleGrid cols={1} spacing="md">
        {children}
      </SimpleGrid>
    </Paper>
  )

  if (isLoading) return (
    <LeaderBoardWrapper>
      {[...Array(10)].map((el, i) => (
        <div className={classes.userCard} key={i}>
          <Group spacing="sm">
            <Skeleton circle height={35} className={classes.avatar} />
            <div>
              <Text size="xs" weight={500} mb={5}>
                <Skeleton height={14} width={150} />
              </Text>
              <Text color="dimmed" style={{ fontSize: 12 }}>
                <Skeleton height={14} width={100} />
              </Text>
            </div>
          </Group>
        </div>
      ))}
    </LeaderBoardWrapper>
  )

  return (
    <LeaderBoardWrapper>
      {data?.data.results.length === 0 && (
        <Text size="xs" ml={5} align="center">
          No records found here
        </Text>
      )}
      {data?.data.results.map((el, i) => (
        <div className={classes.userCard} key={i}>
          <Group spacing="sm">
            <Avatar
              size={35}
              src={el.reciever.avatar}
              radius={35}
              className={classes.avatar}
            />
            <div>
              <Text size="xs" weight={500}>
                {`${el.reciever.first_name} ${el.reciever.last_name}`}
              </Text>
              <Text color="dimmed" style={{ fontSize: 12 }}>
                {`@${shortenText(el.reciever.username, 10)}`}
              </Text>
            </div>
          </Group>
          <Badge className={classes.badge}>
            <MdWavingHand className={classes.clapIcon} />
            {el.claps}
          </Badge>
        </div>
      ))}
    </LeaderBoardWrapper>
  );
}
