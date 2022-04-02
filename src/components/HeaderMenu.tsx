import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Text,
  Badge,
  ThemeIcon,
  ActionIcon,
  Avatar,
  Divider,
  Button,
} from "@mantine/core";
import React from "react";
import { SmartHome, Notification, Home2, Settings, Search, Photo, MessageCircle, BrandApple, BrandGoogle } from 'tabler-icons-react';
import { auth } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import ThemeSwitcher from "./ThemeSwitcher";
import { UserMenu } from "./UserMenu";

const useStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
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

function AppleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" viewBox="0 0 16 16">
      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
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
  const { classes } = useStyles();

  const signinWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential, result.user)
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <Header height={NavHeight} className={classes.header}>
      <div className={classes.inner}>
        <Text className={classes.linkText}>FEED</Text>
        <Group spacing={10} className={classes.links}>
          <Button leftIcon={<GoogleIcon />} variant="default" color="gray" onClick={() => signinWithGoogle()}>Continue with Google</Button>
          <Button leftIcon={<AppleIcon />} variant="default" className={classes.apple}>Continue with Apple</Button>
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

          <ActionIcon radius="md" size="lg" variant="light" title="Notification Center" className={classes.link}>
            <Notification size={18} />
          </ActionIcon>

          <ThemeSwitcher size={18} />

          <UserMenu />
        </Group>
      </div>
    </Header>
  );
}
