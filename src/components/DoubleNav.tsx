import { createStyles, Navbar } from '@mantine/core';
import Sidenav from './Sidenav';
import UserLists from './UserLists';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },

  aside: {
    flex: '0 0 60px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  main: {
    flex: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
}));

export default function DoubleNav() {
  const { classes, cx } = useStyles();

  return (
    <Navbar height={750} width={{ sm: 300 }}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <UserLists />
        </div>
        <div className={classes.main}>
          <Sidenav />
        </div>
      </Navbar.Section>
    </Navbar>
  );
}