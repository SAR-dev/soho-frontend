import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Spoiler,
  Anchor,
  SegmentedControl,
  Center,
  Box,
  Chip,
  Button,
  Indicator,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Eye, Code, ExternalLink, Clock } from "tabler-icons-react";
import { MdWavingHand } from "react-icons/md";
import { GoPrimitiveDot, GoFlame } from "react-icons/go";
import {HiBadgeCheck} from 'react-icons/hi';
import { ImageCarousel } from "./ImageCarousel";
import { PollItems } from "./PollItems";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    position: "relative",
    padding: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    display: "flex",
  },
  avatarWrapper: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    borderRadius: "100%",
    padding: 3,
    backgroundColor: theme.colors.dark[5],
    ['img']: {
      borderRadius: "100%",
    }
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  time: {
    marginLeft: 5,
  },
  typography: {
    fontSize: theme.fontSizes.sm,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  fire: {
    color: theme.colors.red[5],
  },
  reactions: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
  },
}));

interface DiscussionPostProps {
  postedAt: string;
  body: string;
  temp: string;
  author: {
    name: string;
    image: string;
  };
}

export function DiscussionPostCard({
  postedAt,
  body,
  author,
  temp,
}: DiscussionPostProps) {
  const { classes, cx } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.avatarWrapper}>
        <Indicator inline size={18} offset={10} position="bottom-end" className='circular' label={<HiBadgeCheck />} withBorder>
          <Avatar
            size={60}
            src={author.image}
            alt={author.name}
            className={classes.avatar}
          />
        </Indicator>
      </div>
      <div>
        <Group spacing="xs">

          <Text size="sm" weight={700}>
            {author.name}
          </Text>
          <div className={cx(classes.flex, classes.fire)}>
            <GoFlame size={16} />
            <Text size="sm" weight={700} className={classes.time}>
              {temp}&deg;C
            </Text>
          </div>

          <div className={classes.flex}>
            <Clock size={16} />
            <Text size="sm" color="dimmed" weight={700} className={classes.time}>
              {postedAt}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.typography}>
          <div dangerouslySetInnerHTML={{ __html: body }} />
          <Anchor
            component={Link}
            to="/react-router"
            className={classes.typography}
          >
            Continue reading...
          </Anchor>
        </TypographyStylesProvider>
        <PollItems />
        <ImageCarousel />
        <Group spacing="lg">
          <div className={classes.flex}>
            <Text size="sm" weight={500}>
              24
            </Text>
            <Text
              size="sm"
              weight={500}
              color="dimmed"
              style={{ marginLeft: 5 }}
            >
              Reply
            </Text>
          </div>
          <div className={classes.flex}>
            <MdWavingHand />
            <Text size="sm" weight={500} style={{ marginLeft: 5 }}>
              132
            </Text>
          </div>
          <Group spacing={2}>
            <Button
              styles={(theme) => ({
                root: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[2],
                },

                leftIcon: {
                  marginRight: 5,
                },
              })}
              size="xs"
              compact
              leftIcon={<Eye size={12} />}
            >
              01
            </Button>
            <Button
              styles={(theme) => ({
                root: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[2],
                },

                leftIcon: {
                  marginRight: 5,
                },
              })}
              size="xs"
              compact
              leftIcon={<Code size={12} />}
            >
              02
            </Button>
            <Button
              styles={(theme) => ({
                root: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[2],
                },

                leftIcon: {
                  marginRight: 5,
                },
              })}
              size="xs"
              compact
              leftIcon={<ExternalLink size={12} />}
            >
              03
            </Button>
          </Group>
        </Group>
      </div>
    </div>
  );
}
