import React from "react";
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  Paper,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  main: {
    borderRadius: 0,
    minHeight: "100vh",
  },
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },
  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    fontFamily: 'sans-serif',
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },
  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export function Error503() {
  const { classes } = useStyles();

  return (
    <Paper className={classes.main}>
      <Container className={classes.root}>
        <div className={classes.label}>503</div>
        <Title className={classes.title}>Service is currently unavailable.</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Group position="center">
          <Button variant="light" size="md">
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </Paper>
  );
}
