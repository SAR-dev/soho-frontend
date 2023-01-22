import { Avatar, Button, Modal, createStyles, Group, Paper, Stack, Text, Anchor } from '@mantine/core';
import { CommunityDataParam } from '@interfaces/community';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCommunity } from 'src/helpers';
import { useState } from 'react';
import { Error404 } from '@pages/Error404';
import { FaUserAlt } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import { BsFillPatchCheckFill } from 'react-icons/bs';

const useStyles = createStyles((theme) => ({
    mainpaper: {
        height: "100vh",
        display: "flex",
        borderRadius: 0,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        alignItems: "end"
    },
    contentWrapper: {
        width: "100%",
    },
    titleWrapper: {
        display: "flex",
        justifyContent: "space-between",
        height: "fit-content",
        maxWidth: 1200,
        width: "100%",
        paddingLeft: 25,
        paddingRight: 25,
        marginLeft: "auto",
        marginRight: "auto"
    },
    title: {
        fontSize: 64,
        lineHeight: 1,
        fontWeight: 600,
        color: "#fff",
        letterSpacing: 2
    },
    joining: {
        height: "auto",
        width: 180,
        fontSize: 30,
        lineHeight: 1,
        color: "#000",
        backgroundColor: "#FCE700",
        borderRadius: 10,

        'span': {
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif"
        },

        '&:hover': {
            backgroundColor: "#FFB200",
        },

        '&:focus': {
            backgroundColor: "#FFB200"
        },
    },
    darkbg: {
        paddingTop: 10,
        paddingBottom: 45,
        background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,.95) 100%);"

    },
    lightbg: {
        paddingTop: 230,
        paddingBottom: 10,
        background: "linear-gradient(0deg, rgba(0,0,0,.95) 0%, rgba(0,0,0,.75) 50%, rgba(0,0,0,0) 100%);"
    },
    back: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
    },
    backwrapper: {
        maxWidth: 1200,
        width: "100%",
        margin: "auto",
        paddingTop: 25
    }
}));

interface DataParam {
    data: CommunityDataParam
}

export function CJoin() {
    const { classes, cx } = useStyles();
    const { author } = useParams<"author">();
    const [opened, setOpened] = useState(false)

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['community', author], () => getCommunity({ username: author }))

    if (isLoading) return (
        <Paper className={classes.mainpaper}>
        </Paper>
    )

    if (isError) return <Error404 />

    return (
        <Paper className={classes.mainpaper} style={{ backgroundImage: `url('${data?.data.cover}')` }}>
            {/* <div className={classes.back}>
                <div className={classes.backwrapper}>
                    <Button color="dark" component={Link} to={`/${author}`}>Home</Button>
                </div>
            </div> */}
            <Stack className={classes.contentWrapper} spacing={0}>
                <div className={classes.lightbg}>
                    <div className={classes.titleWrapper}>
                        <Group align="center">
                            <Text style={{ fontFamily: "'DM Sans', sans-serif" }} className={classes.title}>
                                {data?.data.author.first_name.toLocaleUpperCase()} {data?.data.author.last_name.toLocaleUpperCase()}
                            </Text>
                            <BsFillPatchCheckFill size={30} color="#fff" />
                        </Group>
                        <Button color="yellow" className={classes.joining} onClick={() => setOpened((o) => !o)}>{data?.data.subscribed ? "JOINED" : "JOIN"}</Button>
                    </div>
                </div>
                <div className={classes.darkbg}>
                    <div className={classes.titleWrapper}>
                        <Group align="center">
                            <FaUserAlt color="#FCE700" size={20} />
                            <Text weight={700} size="xl" color="white">{data?.data.subscribers_count.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })} {data?.data.members_name}</Text>
                            <Text weight={700} size="xl" color="white">|</Text>
                            <Text weight={700} size="xl" color="white">{data?.data.slogan}</Text>
                        </Group>

                        <Group align="center" style={{minWidth: 180, justifyContent: "center"}} spacing={0}>
                            <BiDollar color="#FCE700" size={25} style={{marginRight: 5}} />
                            <Text weight={700} size="xl" color="white" mr={5}>{data?.data.unit_amount}</Text>
                            <Text weight={700} size="xl" color="white">{data?.data.currency?.toLocaleUpperCase()}</Text>
                            <Text weight={700} size="xl" color="white">/</Text>
                            <Text weight={700} size="xl" color="white"> {data?.data.sub_interval?.toLocaleUpperCase()}</Text>
                        </Group>
                    </div>
                </div>
            </Stack>
            {data && (
                <Modal
                    centered
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Welcome!!"
                >
                    <Stack spacing="sm" style={{ position: "relative", width: 500 }}>
                        <Group>
                            <Avatar size="lg" src={data.data.author.avatar} />
                            <Stack spacing={0}>
                                <Text>{`${data.data.author.first_name} ${data.data.author.last_name}`}</Text>
                                <Text size="xs">{`c/${data.data.author.username}`}</Text>
                            </Stack>
                        </Group>
                        {(data.data.is_admin || data.data.is_moderator) ? (
                            <>
                                <Text>You can not unsubscribe this community.</Text>
                                <Anchor href={`${import.meta.env.VITE_API_URL}payment/checkout/?payor=${data.data.author.username}&price_id=${data.data.price_id}`} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm">
                                        Payment Page
                                    </Button>
                                </Anchor>
                            </>
                        ) : (<>
                            <Text>Welcome to {`${data.data.author.first_name} ${data.data.author.last_name}`}</Text>
                            <Text>You need to pay {data.data.unit_amount} in {data.data.currency.toUpperCase()}. Please read the group rules carefully.</Text>
                            <Text>To continue proceed to payment page. Once you finish payment you will be subscribed to group automatically. It may take a few minutes to complete payment process. Please wait patiently.</Text>
                            <Group mt="sm">
                                <Button component={Link} to={`/${data.data.author.username}/t/rules`}>
                                    Read Rules
                                </Button>
                                <Anchor href={`${import.meta.env.VITE_API_URL}payment/checkout/?payor=${data.data.author.username}&price_id=${data.data.price_id}`} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm">
                                        Payment Page
                                    </Button>
                                </Anchor>
                            </Group>
                        </>)}
                    </Stack>
                </Modal>
            )}
        </Paper>
    )
}