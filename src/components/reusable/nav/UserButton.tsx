import React, { useState } from 'react';
import { Group, Avatar, Text, createStyles, Skeleton, Stack, Popover, Image, Alert, Button } from '@mantine/core';
import { AlertCircle, Plus, UserCircle, Users } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    borderRadius: theme.radius.sm,
  },
  avatar: {
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
  },
  members: {
    display: 'flex',
    alignItems: 'stretch',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2],
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

interface Props {
  id: number;
  title: null;
  about: null;
  members_name: string;
  color: string;
  status: string;
  subscribers_count: number;
  subscribed: boolean;
  post_count: number;
  author: Author;
  slogan: string;
  is_admin: boolean;
  is_moderator: boolean;
  created_at: Date;
  updated_at: Date;
}

interface Author {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  avatar: string;
}

export function UserButton({ data, isLoading }: { data?: Props, isLoading: boolean }) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false)

  return (
    <div className={classes.user}>
      <Group>
        <Avatar src={data?.author?.avatar} size="lg" radius="xl" className={classes.avatar}>
          <UserCircle size="lg" />
        </Avatar>

        <div style={{ flex: 1 }}>
          {isLoading && (<>
            <Stack spacing="xs">
              <Skeleton height={12} radius="xs" />
              <Skeleton height={12} radius="xs" />
              <Skeleton height={12} radius="xs" />
            </Stack>
          </>)}
          {data && (
            <>
              <Text size="sm" weight={500}>
                {`${data?.author?.first_name} ${data?.author?.last_name}`}
              </Text>
              {data.slogan && data.slogan.length !== 0 && (
                <Text color="dimmed" size="xs">
                  {data.slogan}
                </Text>
              )}
              <Popover
                opened={opened}
                onClose={() => setOpened(false)}
                style={{ width: "100%" }}
                target={
                  <Group spacing="xs" className={classes.members} onClick={() => setOpened((o) => !o)}>
                    <div className={classes.membersCount}>
                      <Users size={14} />
                      <Text size="xs" color="gray" ml={5}>{data?.subscribers_count} Members</Text>
                    </div>
                    <div className={classes.action}>
                      <Plus size={14} />
                    </div>
                  </Group>
                }
                width={260}
                position="bottom"
                withArrow
              >
                <div style={{ display: 'flex' }}>
                  <Alert title="Wanna Join!" withCloseButton onClose={() => setOpened(false)}>
                    <Text size="xs">
                      Please read the community rules carefully before joining.
                    </Text>
                    <Button size="xs" fullWidth mt="sm" component={Link} to={`/c/${data.author.username}/join`}>
                      Details Page
                    </Button>
                  </Alert>
                </div>
              </Popover>
            </>
          )}
        </div>
      </Group>
    </div>
  );
}