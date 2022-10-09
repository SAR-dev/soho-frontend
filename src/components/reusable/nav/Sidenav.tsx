import { useState } from 'react';
import {
  createStyles,
  Navbar,
  TextInput,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  ScrollArea,
  Modal,
} from '@mantine/core';
import { Search, Plus, ArrowsSort } from 'tabler-icons-react';
import { UserButton } from './UserButton';
import { Channels } from './Channels';
import { ChannelCreateForm } from './ChannelCreateForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { PostTypes } from './PostTypes';
import { getCommunity } from '../../../helpers';
import { ActivityBottom } from './ActivityBottom';
import { CommunityDataParam } from '@interfaces/community';
import { getHotkeyHandler } from '@mantine/hooks';
import { BiFolderPlus } from 'react-icons/bi';
import { MdOutlineTag } from "react-icons/md";
import { SubChannelCreateForm } from './SubChannelCreateForm';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    borderRight: "0px",
    height: "100vh",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none',
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: 'block',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][1],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    padding: theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
  footerIcon: {
    color: theme.colors.blue[5]
  }
}));

interface DataParam {
  data: CommunityDataParam
}


export function Sidenav() {
  const { author } = useParams<"author">();
  const { classes, cx } = useStyles();
  const navigate = useNavigate()

  const [text, setText] = useState("")
  const [channel, setChannel] = useState(false);
  const [subChannel, setSubChannel] = useState(false);
  const [defaultSlug, setDefaultSlug] = useState("")

  const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['community', author], () => getCommunity({ username: author }))

  const submit = () => {
    if (text.length !== 0) {
      navigate(`/c/search/${text}`)
    }
  }

  return (
    <>
      <Navbar className={classes.navbar}>
        <TextInput
          placeholder="Type and press Enter to search"
          size="xs"
          icon={<Search size={12} />}
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          mb="sm"
          className='thick-border'
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={getHotkeyHandler([
            ['Enter', submit],
          ])}
        />

        <UserButton data={data?.data} isLoading={isLoading} author={author} />

        <Navbar.Section className={classes.section} grow component={ScrollArea} style={{ marginBottom: 0 }}>
          <div className={classes.mainLinks}>
            <PostTypes />
          </div>

          <Group mb="sm" className={classes.collectionsHeader} position="apart">
            <Text size="xs" weight={500} color="dimmed">
              SOHO
            </Text>
            {data?.data?.is_admin && (
              <Group spacing="xs" mr="xs">
                <Tooltip label="Create Folder" withArrow position="right">
                  <ActionIcon variant="default" size={18} onClick={() => setChannel(true)}>
                    <BiFolderPlus size={12} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Create Soho" withArrow position="right">
                  <ActionIcon variant="default" size={18} onClick={() => setSubChannel(true)}>
                    <MdOutlineTag size={12} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            )}
          </Group>
          {data?.data && (
            <Channels setDefaultSlug={setDefaultSlug} is_admin={data.data.is_admin} />
          )}
        </Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <ActivityBottom />
        </Navbar.Section>
      </Navbar>
      <Modal
        centered
        opened={channel}
        onClose={() => setChannel(false)}
        title="Create a Folder"
      >
        <ChannelCreateForm setOpened={setChannel} />
      </Modal>
      <Modal
        centered
        opened={subChannel}
        onClose={() => setSubChannel(false)}
        title="Create a Soho"
      >
        <SubChannelCreateForm setOpened={setSubChannel} channel={defaultSlug} />
      </Modal>
    </>
  );
}