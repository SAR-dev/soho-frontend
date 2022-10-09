import { useRef, useState } from 'react';
import { Collapse, createStyles, ActionIcon, Modal, Tooltip, Loader, Group, Center } from '@mantine/core';
import { Hash, Plus, X } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { Category, SubCategory } from '@interfaces/category';
import { useDrop, useDrag } from 'ahooks';
import { capitalizeFirstLetter, parseErrors, relocateSubChannel } from 'src/helpers';
import { SubChannelCreateForm } from './SubChannelCreateForm';
import { GoTriangleRight } from 'react-icons/go';
import { useQueryClient } from 'react-query';
import { useNotifications } from '@mantine/notifications';
import { RiDragMoveLine } from "react-icons/ri"
import { MdEdit } from 'react-icons/md';
import { ChannelUpdateForm } from './ChannelUpdateForm';
import { SubChannelUpdateForm } from './SubChannelUpdateForm';

const useStyles = createStyles((theme, _params, getRef) => ({
  control: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    lineHeight: 1,
    color: theme.colors.gray[6],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    [`&:hover .${getRef('child')}`]: {
      visibility: "visible"
    }
  },

  hidden: {
    opacity: 0
  },

  collectionLink: {
    position: "relative",
    display: 'flex',
    alignItems: "center",
    padding: `0px ${theme.spacing.xs}px`,
    justifyContent: "space-between",

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    [`&:hover .${getRef('child')}`]: {
      visibility: "visible"
    }
  },

  collectionText: {
    padding: "8px 0px",
    width: "100%",
    display: 'flex',
    alignItems: "center",
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,
  },

  collectionIcon: {
    marginRight: 9,
    fontSize: 16,
    width: 22,
    textAlign: "center"
  },

  placeholder: {
    fontWeight: 500,
    display: 'flex',
    allignItems: "center",
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 25,
    marginLeft: 25,
    width: "auto",
    textAlign: "left",
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    border: `1px dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },

  inactive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
  },

  active: {
    backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.5),
    opacity: 1,
    transition: "opacity .15s ease-in"
  },

  chevron: {
    position: "absolute",
    left: -10,
    color: theme.colors.gray[7]
  },

  drop: {
    height: 6,
    marginTop: -3,
    marginBottom: -3,
  },
  child: {
    ref: getRef('child'),
    visibility: "hidden"
  }

}));

export interface Props {
  id: number;
  name: string;
  slug: string;
  sub_categories: SubCategory[];
  author?: string;
  is_admin: boolean
}

export function SubChannel({ sub_category, author, chevron, is_admin }: { sub_category: SubCategory, author?: string, chevron?: boolean, is_admin: boolean }) {
  const { classes, theme } = useStyles();
  const [dragging, setDragging] = useState(false);
  const [subChannelEditing, setSubChannelEditing] = useState(false)

  const dragRef = useRef(null);

  useDrag(sub_category, dragRef, {
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(false);
    },
  });

  return (
    <>
      <div className={classes.collectionLink} ref={dragRef}>
        <Link id={sub_category.slug} to={`/c/${author}/sch/${sub_category.slug}`} className={classes.collectionText}>
          <div className={classes.collectionIcon}>{sub_category.emoji}</div> {sub_category.name}
          {chevron && <GoTriangleRight className={classes.chevron} />}
        </Link>
        {is_admin && (
          <Tooltip label="Update SOHO" withArrow position="right">
            <ActionIcon size={18} variant="default" className={classes.child} onClick={() => setSubChannelEditing(true)} mr="xs">
              <MdEdit size={12} />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
      <Modal
        centered
        opened={subChannelEditing}
        onClose={() => setSubChannelEditing(false)}
        title="Update a SOHO"
      >
        <SubChannelUpdateForm setOpened={setSubChannelEditing} name={sub_category.name} slug={sub_category.slug} icon={sub_category.emoji} />
      </Modal>
    </>
  )
}

export function ChannelHeader({ name }: { name: string }) {
  const { classes, theme } = useStyles();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className={classes.collectionIcon}><Hash size={16} /></div> {name}
    </div>
  )
}

interface DataParam {
  data: {
    count: number;
    next: null;
    previous: null;
    results: Category[];
  }
}

export function Channel({ id, name, slug, sub_categories, author, is_admin }: Props) {
  const { classes, cx, theme } = useStyles();
  const hasLinks = sub_categories.length !== 0;
  const [opened, setOpened] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(false)
  const [subChannelCreating, setSubChannelCreating] = useState(false)
  const [channelEditing, setChannelEditing] = useState(false)

  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const dropRef = useRef(null);


  const items = (hasLinks ? sub_categories : []).map((link, i) => (
    <SubChannel author={author} sub_category={link} chevron={name === "default"} is_admin={is_admin} key={i} />
  ));

  useDrop(dropRef, {
    onDom: (content: SubCategory, e) => {
      setLoading(true)
      relocateSubChannel({ username: author, sub_category: content.slug, data: { category: id } }).then(res => {
        if (res.error) {
          notifications.showNotification({
            title: "Error changing folder",
            message: parseErrors(res.error)[0],
            color: "red",
            icon: <X size={18} />,
          });
          setLoading(false);
          setIsHovering(false)
        } else {
          setLoading(false);
          setIsHovering(false)
          const oldData: any = queryClient.getQueryData<DataParam>(['channels', author])
          const newData = oldData
          const newParentIndex = newData.data.results.findIndex((el: Category) => el.id === id)
          const oldParentIndex = newData.data.results.findIndex((o: Category, i: number) => {
            return o.sub_categories.some((l: SubCategory, i: number) => l.id === content.id)
          })
          const oldChildIndex = newData.data.results[oldParentIndex].sub_categories.findIndex((ol: SubCategory) => ol.id === content.id)
          newData.data.results[newParentIndex].sub_categories.push(content)
          newData.data.results[oldParentIndex].sub_categories.splice(oldChildIndex, 1)
          queryClient.setQueryData(['channels', author], { ...newData })
        }
      })
    },
    onDragEnter: () => setIsHovering(true),
    onDragLeave: () => setIsHovering(false),
  });

  return (
    <div>
      {name !== "default" && (
        <div id={slug} className={cx(classes.control, { [classes.active]: isHovering })} ref={loading ? undefined : dropRef}>
          <div style={{ cursor: "pointer", width: "100%" }} onClick={() => setOpened(!opened)}>
            <ChannelHeader name={capitalizeFirstLetter(name)} />
          </div>
          {loading ? (
            <Loader size="xs" />
          ) : (
            <Center mr="xs">
              {is_admin && (
                <Tooltip label="Update Soho" withArrow position="right">
                  <ActionIcon size={18} variant="default" mr="sm" className={classes.child} onClick={() => setChannelEditing(true)}>
                    <MdEdit size={12} />
                  </ActionIcon>
                </Tooltip>
              )}
              <Tooltip label="Create Soho Here" withArrow position="right">
                <ActionIcon size={18} variant="default" onClick={() => setSubChannelCreating(true)}>
                  <Plus size={12} />
                </ActionIcon>
              </Tooltip>
            </Center>
          )}
        </div>
      )}
      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
      {name === "default" && (
        <div id={slug} style={{ paddingTop: 6, paddingBottom: 6 }} className={cx(classes.collectionLink, { [classes.active]: isHovering }, { [classes.hidden]: !isHovering })} ref={loading ? undefined : dropRef}>
          <div className={classes.collectionIcon}><RiDragMoveLine size={16} /></div> Drop Here
          {loading && (
            <Loader size="xs" ml="auto" />
          )}
        </div>
      )}
      <Modal
        centered
        opened={subChannelCreating}
        onClose={() => setSubChannelCreating(false)}
        title="Create a Soho"
      >
        <SubChannelCreateForm setOpened={setSubChannelCreating} channel={slug} />
      </Modal>
      <Modal
        centered
        opened={channelEditing}
        onClose={() => setChannelEditing(false)}
        title="Update a Folder"
      >
        <ChannelUpdateForm setOpened={setChannelEditing} name={name} slug={slug} />
      </Modal>
    </div>
  );
}