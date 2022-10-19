import React, { useEffect, useRef, useState } from 'react';
import { Group, Avatar, Text, createStyles, Skeleton, Stack, Popover, Image, Alert, Button, ActionIcon, Tooltip, Loader } from '@mantine/core';
import { AlertCircle, Check, Minus, Plus, Upload, UserCircle, Users, X } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { CommunityDataParam } from '@interfaces/community';
import { parseErrors, toBase64, updateAvatarOfLoggedInUser } from 'src/helpers';
import { BsSave } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';
import { AvatarUpdateInterface } from '@interfaces/api';
import { useNotifications } from '@mantine/notifications';
import { useQueryClient } from 'react-query';
import { UserDataParam } from '@interfaces/user';

const useStyles = createStyles((theme, _params, getRef) => ({
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
  },
  relative: {
    position: "relative",
    [`&:hover .${getRef("uploader")}`]: {
      opacity: 1,
    },
  },
  uploader: {
    ref: getRef("uploader"),
    position: "absolute",
    bottom: 0,
    right: 0,
    opacity: 0
  },
  circle: {
    borderRadius: "100%"
  }
}));

interface CDataParam {
  data: CommunityDataParam
}

export function UserButton({ data, isLoading, author }: { data?: CommunityDataParam, isLoading: boolean, author?: string }) {
  const { classes } = useStyles();
  const notifications = useNotifications();
  const queryClient = useQueryClient()

  const [opened, setOpened] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false)

  const handleChange = async (e: any) => {
    setLoading(true)

    const updatedData: AvatarUpdateInterface = {
      avatar: e.target.files[0]
    }

    updateAvatarOfLoggedInUser({ data: updatedData }).then(res => {
      if (res.error) {
        setLoading(false)
        notifications.showNotification({
          title: "Avatar not updated",
          message: parseErrors(res.error)[0],
          color: "red",
          icon: <X size={18} />,
        });
      } else {
        notifications.showNotification({
          title: "Updated",
          message: "Your avatar has been updated.",
          color: "teal",
          icon: <Check size={18} />,
          autoClose: 5000,
        });
        setLoading(false)
        const oldData1: any = queryClient.getQueryData<UserDataParam>(['me'])
        const newData1 = oldData1
        newData1.avatar = res.data.avatar
        queryClient.setQueryData(['me'], { ...newData1 })

        const oldData2: any = queryClient.getQueryData<CDataParam>(['community', author])
        const newData2 = oldData2
        newData2.data.author.avatar = res.data.avatar
        queryClient.setQueryData(['community', author], { ...newData2 })
      }
    })
  };

  return (
    <div className={classes.user}>
      <Group>
        <div className={classes.relative}>
          {loading ? (
            <Loader size={54} style={{ borderRadius: "100%" }} className={classes.avatar} />
          ) : (
            <Avatar src={data?.author.avatar} size="lg" radius="xl" className={classes.avatar} />
          )}
          {data?.is_admin && (
            <Tooltip label="Select Avatar" position="bottom" className={classes.uploader}>
              <ActionIcon loading={loading} color="blue" variant="filled" size="xs" className={classes.circle} onClick={() => fileRef?.current?.click()}>
                <Upload size={12} />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
        <input
          ref={fileRef}
          onChange={handleChange}
          multiple
          type="file"
          accept="image/*"
          hidden
        />
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
                      {data.subscribed ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </Group>
                }
                width={260}
                position="bottom"
                withArrow
              >
                <div style={{ display: 'flex' }}>
                  {data.subscribed ? (
                    <>
                      {(data.is_admin || data.is_moderator) ? (
                        <Alert withCloseButton onClose={() => setOpened(false)}>
                          <Text size="xs">
                            Admin or Moderators can't leave their community.
                          </Text>
                        </Alert>
                      ) : (
                        <Alert color="red" title="Wanna Leave!!!" withCloseButton onClose={() => setOpened(false)}>
                          <Text size="xs">
                            Are you sure you want to leave this community? This can not be undone!!!
                          </Text>
                          <Button color="red" size="xs" fullWidth mt="sm" component={Link} to={`/c/${data.author.username}/leave`}>
                            I'm Sure
                          </Button>
                        </Alert>
                      )}
                    </>
                  ) : (
                    <Alert title="Wanna Join!" withCloseButton onClose={() => setOpened(false)}>
                      <Text size="xs">
                        Please read the community rules carefully before joining.
                      </Text>
                      <Group mt="sm" >
                        <Button size="xs" component={Link} to={`/c/${data.author.username}/t/rules`}>
                          Read Rules
                        </Button>
                        <Button size="xs" component={Link} to={`/c/${data.author.username}/join`}>
                          Details
                        </Button>
                      </Group>
                    </Alert>
                  )}
                </div>
              </Popover>
            </>
          )}
        </div>
      </Group>
    </div>
  );
}