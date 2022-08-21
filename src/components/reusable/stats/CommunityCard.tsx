import { CommunityDataParam, CommunitySearchDataParam } from "@interfaces/community";
import {
  createStyles,
  Text,
  Card,
  Group,
  Avatar,
  Skeleton,
} from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from 'dayjs/plugin/updateLocale';
import { capitalizeFirstLetter, doubleDigit } from "src/helpers";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column"
    }
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md
    }
  },
  circle: {
    padding: 5,
    borderRadius: "100%",
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: theme.colors.dark[4],
  }
}));

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: '1 Min',
    m: "1 Min",
    mm: "%d Min",
    h: "1 Hr",
    hh: "%d Hr",
    d: "1 D",
    dd: "%d D",
    M: "01 M",
    MM: "%d M",
    y: "1 Y",
    yy: "%d Y"
  }
})

export function CommunityCard({ ...props }: CommunitySearchDataParam) {
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      p="xl"
      radius="sm"
      style={{
        background: `linear-gradient(0deg, rgba(72, 84, 97, .25), rgba(40, 49, 59, .25) ), url(${props.cover})`
      }}
      className={classes.card}
    >
      <div className={classes.inner}>
        <div>
          <Text size="xl" className={classes.label} lineClamp={1}>
            {`${props.author.first_name} ${props.author.last_name}`}
          </Text>
          <Text size="xs" lineClamp={1}>
            {props.author.username}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {doubleDigit(props.subscribers_count)}
            </Text>
            <Text size="xs">
              {props.members_name}
            </Text>
          </div>
          <Group mt="lg">
            <div>
              <Text className={classes.label}>{dayjs(props.created_at).fromNow(true)}</Text>
              <Text size="xs">
                Age
              </Text>
            </div>
            <div>
              <Text className={classes.label}>{capitalizeFirstLetter(props.status)}</Text>
              <Text size="xs">
                Status
              </Text>
            </div>
          </Group>
        </div>

        <div className={classes.ring}>
          <div className={classes.circle}>
            <Avatar
              src={props.author.avatar}
              size={150}
              radius={150}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function CommunityPlaceholderCard() {
  const { classes } = useStyles();

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Skeleton height={14} width={150} />
          <Skeleton height={14} width={120} mt="xs" />
          <Skeleton height={14} width={150} mt="lg" />
          <Skeleton height={14} width={120} mt="xs" />
          <Group mt="lg">
            <div>
              <Skeleton height={14} width={70} />
              <Skeleton height={14} width={70} mt="xs" />
            </div>
            <div>
              <Skeleton height={14} width={70} />
              <Skeleton height={14} width={70} mt="xs" />
            </div>
          </Group>
        </div>

        <div className={classes.ring}>
          <Skeleton circle height={120} radius={120} />
        </div>
      </div>
    </Card>
  );
}
