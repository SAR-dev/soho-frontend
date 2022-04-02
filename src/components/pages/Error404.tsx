import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, Paper } from '@mantine/core';
import image from '../../images/404.svg';
import { AppsCards } from '../AppsCards';

const useStyles = createStyles((theme) => ({
  main: {
    borderRadius: 0,
    minHeight: "100vh"
  },
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },
  grid: { alignItems: "center" },
  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },
  subtitle: {
    marginBottom: theme.spacing.md,
  },
  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

export function Error404() {
  const { classes } = useStyles();

  return (
    <Paper className={classes.main}>
      <Container className={classes.root}>
        <SimpleGrid spacing={80} cols={2} className={classes.grid}>
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text color="dimmed" size="lg" className={classes.subtitle}>
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. <br /> Here are some pages to explore:
            </Text>
            <AppsCards />
          </div>
          <Image src={image} />
        </SimpleGrid>
      </Container>
    </Paper>
  );
}