import { Paper, createStyles, Avatar, Input, ThemeIcon, Badge, Indicator, ActionIcon, Alert } from "@mantine/core";
import { AlertCircle, BrandTwitter, Photo } from "tabler-icons-react";
import { HiBadgeCheck } from "react-icons/hi";
import { isError, useQuery } from "react-query";
import { getCommunity } from "../../helpers";
import { useParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
  },
  menus: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    marginBottom: theme.spacing.sm,
    width: "100%",
  },
  editor: {
    width: "100%",
    marginBottom: theme.spacing.sm,
    border: "none",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.md,
  },
  photoButton: {
    cursor: "pointer",
    width: 38,
    height: 38,
    flexShrink: 0,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : 'transparent',
    borderWidth: 2,
    borderColor: theme.colorScheme === "dark" ? 'transparent' : theme.colors.gray[4],
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[5],
  },
  avatar: {
    borderRadius: "100%",
    padding: 3,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
    ["img"]: {
      borderRadius: "100%",
    },
  },
}));

interface DataParam {
  data: {
    id: number;
    title: null;
    about: null;
    members_name: string;
    color: string;
    status: string;
    subscribers_count: number;
    subscribed: boolean;
    post_count: number;
    author: Author;
    slogan: string;
    is_admin: boolean;
    is_moderator: boolean;
    created_at: Date;
    updated_at: Date;
  }
}

interface Author {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  avatar: string;
}

interface Props {
  toogle: () => void;
}

export function EditorCreator({ toogle }: Props) {
  const { author } = useParams<"author">();

  const { classes, cx } = useStyles();

  const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['community', author], () => getCommunity({ username: author }))

  const Loader = () => (
    <Paper radius={0}>
      <Paper className={classes.container}>
        <div className={classes.flex}>
          <Indicator
            inline
            size={18}
            offset={10}
            position="bottom-end"
            className="circular"
            label={<HiBadgeCheck />}
            withBorder
          >
            <Avatar
              size={60}
              src="https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png"
              alt="Sayed Rafi"
              className={classes.avatar}
            />
          </Indicator>
          <Input
            className={cx(classes.input, "thick-border")}
            width="100%"
            placeholder="Sayed Rafi, What's on your mind ?"
            // icon={<BrandTwitter size={20} />}
            rightSectionWidth={75}
            styles={{ rightSection: { pointerEvents: "none" } }}
            rightSection={
              <Badge color="blue" variant="filled">
                Public
              </Badge>
            }
            disabled={true}
          />
          <ActionIcon className={classes.photoButton} radius="xl" color="gray" disabled={true}>
            <Photo size={20} />
          </ActionIcon>
        </div>
      </Paper>
    </Paper>
  )
  if (isLoading) return (
    <Loader />
  )

  if (isError) return (
    <Loader />
  )

  return (
    <>
      {data && (
        <>
          <Paper radius={0} onClick={() => data.data.subscribed && !isLoading ? toogle() : ''}>
            <Paper className={classes.container}>
              <div className={classes.flex}>
                <Indicator
                  inline
                  size={18}
                  offset={10}
                  position="bottom-end"
                  className="circular"
                  label={<HiBadgeCheck />}
                  withBorder
                >
                  <Avatar
                    size={60}
                    src="https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png"
                    alt="Sayed Rafi"
                    className={classes.avatar}
                  />
                </Indicator>
                <Input
                  className={cx(classes.input, "thick-border")}
                  width="100%"
                  placeholder="Sayed Rafi, What's on your mind ?"
                  // icon={<BrandTwitter size={20} />}
                  rightSectionWidth={75}
                  styles={{ rightSection: { pointerEvents: "none" } }}
                  rightSection={
                    <Badge color="blue" variant="filled">
                      Public
                    </Badge>
                  }
                  disabled={!data?.data?.subscribed}
                />
                <ActionIcon className={classes.photoButton} radius="xl" color="gray" disabled={!data.data.subscribed}>
                  <Photo size={20} />
                </ActionIcon>
              </div>
            </Paper>
          </Paper>
          {!data.data.subscribed && (
            <Alert icon={<AlertCircle size={16} />} color="yellow">
              You need to subscribe to create a post in this group! To subscribe click the "+" button on the left side.
            </Alert>
          )}
        </>
      )}
    </>
  );
}
