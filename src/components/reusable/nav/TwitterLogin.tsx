import { Button, createStyles } from "@mantine/core";
import React from "react";
import { X } from 'tabler-icons-react';
import { useNotifications } from '@mantine/notifications';
import { auth } from "../../../config/firebase";
import { signInWithPopup, TwitterAuthProvider } from "firebase/auth";

const useStyles = createStyles((theme) => ({
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

export function TwitterLogin({setToken}:{setToken: any}) {
  const notifications = useNotifications();
  const { classes } = useStyles();

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
    <Button leftIcon={<TwitterIcon />} variant="default" className={classes.apple} onClick={() => signinWithTwitter()}>Continue with Twitter</Button>
  );
}
