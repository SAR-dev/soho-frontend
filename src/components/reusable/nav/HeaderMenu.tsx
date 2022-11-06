import { createStyles, Header, Group, Text, ActionIcon, Avatar, Button, Loader, Indicator } from "@mantine/core";
import { useState } from "react";
import { Notification, Home2, ArrowLeft, UserCircle, Cookie } from 'tabler-icons-react';
import { signOut, getAuth } from "firebase/auth";
import ThemeSwitcher from "./ThemeSwitcher";
import { UserMenu } from "./UserMenu";
import useStore from "../../../store";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { NotificationDrawer } from "./NotificationDrawer";
import { useQuery } from "react-query";
import { getLoggedInUser, getNotifications, removeTokenFromLocal, setTokenToLocal } from "../../../helpers";
import { GoogleLogin } from "./GoogleLogin";
import { TwitterLogin } from "./TwitterLogin";
import { useNotifications } from "@mantine/notifications";
import { NotificationDataParam } from "@interfaces/notification";
import { UserDataParam } from "@interfaces/user";
import { ClapsCounter } from "./ClapsCounter";
import { auth } from "src/config/firebase";
import { useModals } from "@mantine/modals";

const useStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.sm,
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

export interface DataParam {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: NotificationDataParam[];
    unread: number;
  }
}

export function HeaderMenu({ NavHeight }: { NavHeight: number }) {
  const { classes } = useStyles();
  const { pId } = useParams<"pId">();
  const { pType } = useParams<"pType">();
  const { cName } = useParams<"cName">();
  const { sName } = useParams<"sName">();
  const navigate = useNavigate();
  const modals = useModals();

  const [drawer, setDrawer] = useState(false);

  const { setToken, token, removeToken } = useStore();
  const [notificationCount, setNotificationCount] = useState(0)

  const { status, data, error, isFetching, isLoading } = useQuery<UserDataParam, Error>(["me"], () => getLoggedInUser(), {
    enabled: token !== null,
    onError: () => {
      auth.onIdTokenChanged((credential) => {
        if (credential) {
          credential.getIdToken(true).then((token) => {
            setTokenToLocal(token);
            setToken(token);
          });
        } else {
          removeTokenFromLocal();
          removeToken();
          if(window.location.pathname.split("/").length <= 1 ){
            modals.openContextModal('signin', {
              title: 'Sign In',
              innerProps: {}
            });
          }
        }
      })
    }
  })

  const { } = useQuery<DataParam, Error>(['notifications'], () => getNotifications(), {
    onSuccess: res => {
      setNotificationCount(res.data.unread)
    }
  })

  const getHeaderText = () => {
    if (pType) return pType.toUpperCase()
    if (cName) return cName.toUpperCase()
    if (sName) return sName.toUpperCase()
    return "SOHO"
  }

  return (
    <>
      <Header height={NavHeight} className={classes.header}>
        <div className={classes.inner}>
          {pId ? (
            <Button variant="default" color="dark" size="xs" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              Return
            </Button>
          ) : (
            <Text className={classes.linkText}>{getHeaderText()}</Text>
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
                  <>
                    <ClapsCounter />
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
                  </>
                )}
                {/* <ActionIcon radius="md" size="lg" variant="light" title="Navigate to Home" className={classes.link}>
                  <Home2 size={18} />
                </ActionIcon> */}
                <ActionIcon radius="md" size="lg" variant="light" title="Notification Center" className={classes.link} onClick={() => setDrawer(true)}>
                  {notificationCount === 0 ? (<Notification size={18} />) : (<Indicator inline label={notificationCount} size={16}>
                    <Notification size={18} />
                  </Indicator>)}
                </ActionIcon>
                <ThemeSwitcher size={18} />
                <UserMenu username={data?.username} />
              </>
            ) : (
              <>
                <GoogleLogin setToken={setToken} />
                {/* <TwitterLogin setToken={setToken} /> */}
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
