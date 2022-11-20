import { useRef, useState } from 'react';
import {
  Group,
  Avatar,
  Text,
  createStyles,
  Skeleton,
  Stack,
  Button,
  ActionIcon,
  Tooltip,
  Loader,
  Modal,
  Anchor,
} from '@mantine/core';
import { Check, Minus, Plus, Upload, Users, X } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { CommunityDataParam } from '@interfaces/community';
import { parseErrors, updateAvatarOfLoggedInUser } from 'src/helpers';
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
              <Group spacing="xs" className={classes.members} onClick={() => setOpened((o) => !o)}>
                <div className={classes.membersCount}>
                  <Users size={14} />
                  <Text size="xs" color="gray" ml={5}>{data?.subscribers_count} Members</Text>
                </div>
                <div className={classes.action}>
                  {data.subscribed ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </Group>
            </>
          )}
        </div>
      </Group>

      {data && (
        <Modal
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          title="Welcome!!"
        >
          <Stack spacing="sm" style={{ position: "relative", width: 500 }}>
            <Group>
              <Avatar size="lg" src={data.author.avatar} />
              <Stack spacing={0}>
                <Text>{`${data.author.first_name} ${data.author.last_name}`}</Text>
                <Text size="xs">{`c/${data.author.username}`}</Text>
              </Stack>
            </Group>
            {(data.is_admin || data.is_moderator) ? (
              <>
              <Text>You can not unsubscribe this community.</Text>
              <Anchor href={`${import.meta.env.VITE_API_URL}payment/checkout/?payor=${data.author.username}&price_id=${data.price_id}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">
                    Payment Page
                  </Button>
                </Anchor>
              </>
            ) : (<>
              <Text>Welcome to {`${data.author.first_name} ${data.author.last_name}`}</Text>
              <Text>You need to pay {data.unit_amount} in {data.currency.toUpperCase()}. Please read the group rules carefully.</Text>
              <Text>To continue proceed to payment page. Once you finish payment you will be subscribed to group automatically. It may take a few minutes to complete payment process. Please wait patiently.</Text>
              <Group mt="sm">
                <Button component={Link} to={`/c/${data.author.username}/t/rules`}>
                  Read Rules
                </Button>
                <Anchor href={`${import.meta.env.VITE_API_URL}payment/checkout/?payor=${data.author.username}&price_id=${data.price_id}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">
                    Payment Page
                  </Button>
                </Anchor>
              </Group>
            </>)}
          </Stack>
        </Modal>
      )}
    </div>
  );
}
