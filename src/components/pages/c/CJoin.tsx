import { Avatar, Button, Center, createStyles, Group, Paper, Skeleton, Stack, Text } from '@mantine/core';
import { BrandOpenSource, Users, X } from 'tabler-icons-react';
import { CommunityDataParam } from '@interfaces/community';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { capitalizeFirstLetter, getCommunity, parseErrors, subscribe } from 'src/helpers';
import { useState } from 'react';
import { useNotifications } from '@mantine/notifications';
import { Error404 } from '@pages/Error404';
import { FaUserNinja } from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
    mainpaper: {
        height: "100vh",
        display: "flex",
        borderRadius: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    card: {
        padding: "50px 30px",
        borderRadius: theme.radius.sm,
        background: theme.fn.rgba(theme.colors.dark[6], 0.95),
        width: 400
    },
    rounded: {
        borderRadius: "100%",
    },
    avatarContainer: {
        borderRadius: "100%",
        borderWidth: 4,
        borderStyle: "solid",
        borderColor: theme.colors.dark[8],
        padding: theme.spacing.xs,
        width: "max-content",
        margin: "auto"
    },
    title: {
        fontSize: 30,
        fontWeight: 700,
        lineHeight: 1
    },
    iconColor: {
        color: theme.colors.yellow[5]
    },
    joiningButton: {
        margin: "auto",
    },
    align: {
        width: "max-content",
        margin: "auto"
    }
}));

interface DataParam {
    data: CommunityDataParam
}

export function CJoin() {
    const { classes, cx } = useStyles();
    const { author } = useParams<"author">();

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['community', author], () => getCommunity({ username: author }))

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const submit = () => {
        setLoading(true)
        const username = author ? author : ''
        subscribe({ username: username }).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error joining!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                queryClient.invalidateQueries(['community', author])
                navigate(`/c/${author}`)
            }
        })
    }

    if (isLoading) return (
        <Paper className={classes.mainpaper}>
            <Skeleton width={400} height={400} />
        </Paper>
    )

    if(isError) return <Error404 />

    return (
        <Paper className={classes.mainpaper} style={{ backgroundImage: `url('${data?.data.cover}')` }}>
            <Stack className={classes.card}>
                <div className={classes.avatarContainer}>
                    <Avatar src={data?.data.author.avatar} size="xl" className={classes.rounded} />
                </div>
                <Stack spacing={0}>
                    <Text align='center' className={classes.title}>{`${data?.data.author.first_name} ${data?.data.author.last_name}`}</Text>
                    <Text align='center' size="sm" color="dimmed" weight={500}>{data?.data.slogan}</Text>
                </Stack>
                <div>
                    <Group className={classes.align}>
                        <Center>
                            <Users size={18} className={classes.iconColor} />
                            <Text weight={600} size="md" color="dimmed" ml={5}>{data?.data.subscribers_count} {data?.data.members_name}</Text>
                        </Center>
                        <Center>
                            <BrandOpenSource size={18} className={classes.iconColor} />
                            <Text weight={600} size="md" color="dimmed" ml={5}>{data && capitalizeFirstLetter(data.data.status)} Community</Text>
                        </Center>
                    </Group>
                </div>
                {/* <Stack spacing={0}>
                    <Text align='center' className={cx(classes.title, classes.iconColor)}>$ {data?.data.status === "public" ? 0 : 10}</Text>
                    <Text align='center' weight={700} size="sm">ONE TIME JOINING PAYMENT</Text>
                </Stack> */}
                <Button leftIcon={<FaUserNinja />} className={classes.joiningButton} loading={loading} onClick={() => submit()}>Join Community</Button>
            </Stack>
        </Paper>
    )
}