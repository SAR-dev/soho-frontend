import React from 'react';
import {
  Button,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from '@mantine/core';
import { Plus, Users } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4],
    borderRadius: theme.radius.sm,
  },
  avatar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4],
  },
  members: {
    display: 'flex',
    alignItems: 'stretch',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    borderRadius: theme.radius.sm,
    marginTop: 5,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },
  },
  membersCount: {
    display: 'flex',
    alignItems: 'center',
    padding: "2px 8px"
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingRight: '8px',
    paddingLeft: '8px',
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  }
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({ image, name, email, ...others }: UserButtonProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.user}>
      <Group>
        <Avatar src={image} size="lg" radius="xl" className={classes.avatar} />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            Rafi also joined here
          </Text>
          <Group spacing="xs" className={classes.members}>
            <div className={classes.membersCount}>
              <Users size={14} />
              <Text size="xs" color="gray" ml={5}>10 Members</Text>
            </div>
            <div className={classes.action}>
              <Plus size={14} />
            </div>
          </Group>
        </div>
      </Group>
    </div>
  );
}