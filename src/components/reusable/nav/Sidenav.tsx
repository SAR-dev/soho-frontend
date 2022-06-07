import { useState } from 'react';
import {
  createStyles,
  Navbar,
  TextInput,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  ScrollArea,
  Modal,
} from '@mantine/core';
import { Search, Plus, Microphone2, ListCheck, Video } from 'tabler-icons-react';
import { UserButton } from './UserButton';
import { Channels } from './Channels';
import { ChannelCreateForm } from './ChannelCreateForm';
import { MdEmojiPeople, MdQuestionAnswer, MdWavingHand } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Categories } from './Categories';
import { getCommunity } from '../../../helpers';

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

const links = [
  { icon: MdEmojiPeople, label: 'Discussion', notifications: 3 },
  { icon: MdQuestionAnswer, label: 'AMA', notifications: 4 },
  { icon: Video, label: 'Premier' },
  // { icon: BsDropletHalf, label: 'Drop' },
  { icon: Microphone2, label: 'Announcement' },
  { icon: ListCheck, label: 'Rules' },
];

interface DataParam {
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
  common_member: Author;
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


export function Sidenav() {
  const { author } = useParams<"author">();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Discussion');
  const [opened, setOpened] = useState(false);

  const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['community', author], () => getCommunity(author))

  // const mainLinks = links.map((link, i) => (
  //   <UnstyledButton className={cx(classes.mainLink, { [classes.linkActive]: active === link.label })} onClick={() => setActive(link.label)} key={i}>
  //     <div className={classes.mainLinkInner}>
  //       <link.icon size={20} className={classes.mainLinkIcon} />
  //       <span>{link.label}</span>
  //     </div>
  //     {link.notifications && (
  //       <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
  //         {link.notifications}
  //       </Badge>
  //     )}
  //   </UnstyledButton>
  // ));

  return (
    <>
      <Navbar className={classes.navbar}>
        <TextInput
          placeholder="Search"
          size="xs"
          icon={<Search size={12} />}
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          mb="sm"
          className='thick-border'
        />

        <UserButton data={data} isLoading={isLoading} />

        <Navbar.Section className={classes.section} grow component={ScrollArea} style={{ marginBottom: 0 }}>
          <div className={classes.mainLinks}>
            <Categories />
          </div>

          <Group className={classes.collectionsHeader} position="apart">
            <Text size="xs" weight={500} color="dimmed">
              Channels
            </Text>
            {data?.is_admin && (
              <Tooltip label="Create Channel" withArrow position="right">
                <ActionIcon variant="default" size={18} onClick={() => setOpened(true)}>
                  <Plus size={12} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
          <Channels />
        </Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <Group>
            <MdWavingHand size={14} className={classes.footerIcon} />
            <Text size="xs" lineClamp={1}>
              <Text component='span' size="xs" weight={600} mr={3}>
                Sayed Rafi
              </Text>
              clapped your
              <Text component='span' size="xs" weight={600} ml={3}>post</Text>
            </Text>
          </Group>
        </Navbar.Section>
      </Navbar>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create a Channel"
      >
        <ChannelCreateForm setOpened={setOpened} />
      </Modal>
    </>
  );
}