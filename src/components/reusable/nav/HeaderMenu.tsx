import { createStyles, Header, Group, Text, ActionIcon, Avatar, Button, Loader } from "@mantine/core";
import { useState } from "react";
import { Notification, Home2, ArrowLeft, UserCircle } from 'tabler-icons-react';
import { signOut, getAuth } from "firebase/auth";
import ThemeSwitcher from "./ThemeSwitcher";
import { UserMenu } from "./UserMenu";
import useStore from "../../../store";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { NotificationDrawer } from "./NotificationDrawer";
import { useQuery } from "react-query";
import { getLoggedInUser } from "../../../helpers";
import { GoogleLogin } from "./GoogleLogin";
import { TwitterLogin } from "./TwitterLogin";

const useStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
    borderBottomWidth: 3
  },
  linkText: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700
  },
  inner: {
    height: "100%",
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

  apple: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[9],
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
    },
  }
}));

interface DataParam {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  username: string
}

export function HeaderMenu({ NavHeight }: { NavHeight: number }) {
  const { pId } = useParams<"pId">();
  const navigate = useNavigate();

  const [drawer, setDrawer] = useState(false);

  const { classes } = useStyles();
  const { setToken, token } = useStore()

  const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>([token], getLoggedInUser, {
    enabled: token !== null,
    onError: () => {
      const auth = getAuth();
      signOut(auth)
    }
    // TODO ON SUCCESS SHOW COKKIE USAGE NOTIFICATION
  })

  return (
    <>
      <Header height={NavHeight} className={classes.header}>
        <div className={classes.inner}>
          {pId ? (
            <Button variant="default" color="dark" size="xs" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              Go Back
            </Button>
          ) : (
            <Text className={classes.linkText}>FEED</Text>
          )}
          <Group spacing={10} className={classes.links}>
            {token ? (
              <>
                {isLoading && (
                  <Button
                    leftIcon={<Avatar size={22} radius="xl">
                      <UserCircle />
                    </Avatar>}
                    radius="md"
                    variant="light"
                    title="Navigate to own community"
                    className={classes.link}
                  >
                    <Loader color="gray" variant="dots" />
                  </Button>
                )}
                {data && (
                  <Button
                    leftIcon={<Avatar src={data.avatar} size={22} radius="xl">
                      <UserCircle />
                    </Avatar>}
                    radius="md"
                    variant="light"
                    title="Navigate to own community"
                    className={classes.link}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    component={Link}
                    to={`/c/${data.username}`}
                  >
                    {`${data.first_name} ${data.last_name}`}
                  </Button>
                )}
                <ActionIcon radius="md" size="lg" variant="light" title="Navigate to Home" className={classes.link}>
                  <Home2 size={18} />
                </ActionIcon>
                <ActionIcon radius="md" size="lg" variant="light" title="Notification Center" className={classes.link} onClick={() => setDrawer(true)}>
                  <Notification size={18} />
                </ActionIcon>
                <ThemeSwitcher size={18} />
                <UserMenu />
              </>
            ) : (
              <>
                <GoogleLogin setToken={setToken} />
                <TwitterLogin setToken={setToken} />
              </>
            )
            }
          </Group>
        </div>
      </Header>
      <NotificationDrawer opened={drawer} setOpened={setDrawer} />
    </>
  );
}
