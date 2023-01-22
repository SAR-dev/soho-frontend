import { NotificationDataParam, Verb } from '@interfaces/notification';
import { Alert, Button, createStyles, Drawer, ScrollArea, Skeleton, Stack, Text } from '@mantine/core';
import { ClapIcon } from '@reusable/ClapIcon';
import { AiFillLike } from 'react-icons/ai';
import { FaAward, FaReplyAll } from "react-icons/fa";
import { useQuery, useQueryClient } from 'react-query';
import { getNotifications, markAllNotificationDone, markNotificationDone } from 'src/helpers';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useNotifications } from '@mantine/notifications';
import { X } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    notifilert: {
        cursor: "pointer",
        '& .mantine-Alert-icon': {
            marginRight: 8
        },
        '& .mantine-Alert-title': {
            marginBottom: 0,
            fontWeight: 400
        }
    },
    icon: {
        color: "white"
    }
}));

export interface DataParam {
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: NotificationDataParam[];
        unread: number;
    }
}

interface Props {
    opened: boolean
    setOpened: (params: boolean) => void;
}

dayjs.extend(relativeTime)

export function NotificationDrawer({ opened, setOpened }: Props) {
    const { classes, cx } = useStyles();
    const navigate = useNavigate()
    const notifications = useNotifications();
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false)

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['notifications'], () => getNotifications())

    const getIcon = (verb: Verb) => {
        if (verb === "clapped") return <ClapIcon size={16} />
        if (verb === "awarded") return <FaAward className={classes.icon} size={16} />
        if (verb === "replied") return <FaReplyAll className={classes.icon} size={16} />
        return <AiFillLike className={classes.icon} size={16} />
    }

    const getMessage = (el: NotificationDataParam) => {
        const sender = `${el.sender.first_name} ${el.sender.last_name}`
        const verb = el.verb
        const target = el.target_type
        const ago = dayjs(el.created_at).fromNow()
        return `${sender} ${verb} on a ${target} you are following ${ago}`
    }

    const handleClick = (el: NotificationDataParam) => {
        markNotificationDone(el.id)
        const post = el.target_type === "post" ? el.target : el.post
        const target = `/${el.group.author.username}/p/${post}?details=true`
        navigate(target)
        setOpened(false)
    }

    const markAllDone = () => {
        setLoading(true)
        markAllNotificationDone().then(res => {
            if (res.error) {
                notifications.showNotification({
                    title: `Error ${res.error.response.status}`,
                    message: res.error.response.data.detail,
                    color: "red",
                    icon: <X size={18} />,
                });
                setLoading(false);
            } else {
                setLoading(false);
                queryClient.invalidateQueries(["notifications"]);
                setOpened(false);
            }
        })
    }

    return (
        <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title="Notifications"
            padding="xl"
            size="lg"
            position="right"
        >

            <ScrollArea style={{ height: '100vh' }}>
                <Stack>
                    <Button size="xs" color="gray" loading={loading} onClick={() => markAllDone()}>{`Mark all as read (${data?.data.unread})`}</Button>
                    {isLoading && [...Array(10)].map((el, i) =>
                        <Alert icon={<Skeleton circle height={16} />} title={<Skeleton height={14} width={50} />} color="gray" className={classes.notifilert} key={i}>
                            <Skeleton height={14} width="100%" my={5} />
                            <Skeleton height={14} width="100%" />
                        </Alert>
                    )}
                    {data && data.data.results.map((el, i) =>
                        <Alert onClick={() => handleClick(el)} icon={<>{getIcon(el.verb)}</>} title={`${el.sender.first_name} ${el.sender.last_name}`} color={el.done ? "gray" : "blue"} className={classes.notifilert} key={i}>
                            <Text size="xs">{getMessage(el)}</Text>
                        </Alert>
                    )}
                    {data && data.data.results.length === 0 && (
                        <Text size="xs" color="dimmed" align='center'>No more unread notifications</Text>
                    )}
                </Stack>
            </ScrollArea>
        </Drawer>
    )
}
