import { createStyles, Header, Group, Text, ActionIcon, Avatar, Button } from "@mantine/core";
import React, { useState } from "react";
import { Notification, Home2, ArrowLeft, X } from 'tabler-icons-react';
import { useNotifications } from '@mantine/notifications';
import { auth } from "../../../config/firebase";
import { signInWithPopup, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import ThemeSwitcher from "./ThemeSwitcher";
import { UserMenu } from "./UserMenu";
import useStore from "../../../store";
import { useSearchParams } from 'react-router-dom';
import { NotificationDrawer } from "./NotificationDrawer";

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

function TwitterIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="#00acee" viewBox="0 0 16 16">
      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
    </svg>
  )
}

function GoogleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 262"
      width={14}
      height={14}
      {...props}
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      />
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  );
}

export function HeaderMenu({ NavHeight }: { NavHeight: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawer, setDrawer] = useState(false);

  const { classes } = useStyles();
  const { setToken, token } = useStore()
  const notifications = useNotifications();

  const signinWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        if (token) {
          setToken(token)
        }
      }).catch((error) => {
        notifications.showNotification({
          title: `Error ${error.code}`,
          message: error.message,
          color: 'red',
          icon: <X size={18} />
        })
      });
  }

  const signinWithTwitter = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        if (token) {
          setToken(token)
        }
      }).catch((error) => {
        notifications.showNotification({
          title: `Error ${error.code}`,
          message: error.message,
          color: 'red',
          icon: <X size={18} />
        })
      });
  }

  return (
    <>
    <Header height={NavHeight} className={classes.header}>
      <div className={classes.inner}>
        {searchParams.get('post') ? (
          <Button color="gray" size="xs" leftIcon={<ArrowLeft size={16} />} onClick={() => setSearchParams('')}>
            Go Back
          </Button>
        ) : (
          <Text className={classes.linkText}>FEED</Text>
        )}
        <Group spacing={10} className={classes.links}>
          {token ? (
            <>
              <Button
                leftIcon={<Avatar src="https://avatars.dicebear.com/api/micah/seed.svg" size="sm" radius="xl" />}
                radius="md"
                variant="light"
                title="Navigate to Home"
                className={classes.link}
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                Sayed Rafi
              </Button>
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
              <Button leftIcon={<GoogleIcon />} variant="default" color="gray" onClick={() => signinWithGoogle()}>Continue with Google</Button>
              <Button leftIcon={<TwitterIcon />} variant="default" className={classes.apple} onClick={() => signinWithTwitter()}>Continue with Twitter</Button>
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
