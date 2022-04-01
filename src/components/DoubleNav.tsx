import { createStyles, Navbar } from '@mantine/core';
import Sidenav from './Sidenav';
import UserLists from './UserLists';

const useStyles = createStyles((theme) => ({
  mainNav: {
    width: 350,
    flexShrink: 0,
    height: '100vh'
  },
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
    height: '100vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },

  main: {
    flex: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
}));

export default function DoubleNav() {
  const { classes, cx } = useStyles();

  return (
    <Navbar className={classes.mainNav}>
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