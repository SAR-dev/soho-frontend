import { ContextModalProps } from "@mantine/modals";
import { Text, Button, Paper, SegmentedControl, Stack, Grid, SimpleGrid, Image, createStyles, Pagination, Badge } from "@mantine/core";
import { useEffect, useState } from "react";
import { Award, Check, X } from "tabler-icons-react";
import { AvailableAward, PostDataParam } from "@interfaces/post";
import SVG, { Props as SVGProps } from "react-inlinesvg";
import { addAwardToPost, doubleDigit, getPostKey, parseErrors } from "src/helpers";
import { useNotifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

const LIMIT = 8

const useStyles = createStyles((theme, _params, getRef) => ({
    modal: { width: 750, paddingBottom: theme.spacing.md },
    wrapper: {
        paddingBottom: theme.spacing.sm,
        cursor: "pointer",
        '&:hover': {
            backgroundColor: theme.colors.blue[5],
            color: theme.colors.dark[9]
        },
    },
    active: {
        backgroundColor: theme.colors.blue[5],
        color: theme.colors.dark[9]
    },
    inactive: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
    },
    image: {
        padding: theme.spacing.sm
    },
    badge: {
        width: 50,
        margin: "auto"
    },
    giftButton: {
        width: "100%"
    },
    stretch: {
        flexDirection: "column",
        justifyContent: "space-between",
        display: "flex",
        height: "100%",
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        padding: theme.spacing.sm
    },
    selectedImage: {
        objectFit: 'contain',
        height: 120
    }
}));

interface DataParam {
    data: PostDataParam
}

export const PostAwardModal = ({ available_awards, postId }: { available_awards: AvailableAward[], postId: number }) => {
    const { classes, cx } = useStyles();
    const notifications = useNotifications();
    const queryClient = useQueryClient()
    const params = useParams()
    const [price, setPrice] = useState('0');
    const [page, setPage] = useState(1)

    const [active, setActive] = useState<number>()
    const [activeAward, setActiveAward] = useState<AvailableAward | null>()
    const [filteredAwards, setFilteredAwards] = useState<AvailableAward[]>([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const found = available_awards.find(el => el.id === active)
        if (found) {
            setActiveAward(found)
        } else {
            setActiveAward(null)
        }
    }, [active])

    useEffect(() => {
        const filtered = available_awards.filter(el => el.price === parseInt(price))
        setFilteredAwards([...filtered])
    }, [price])

    const submit = () => {
        setLoading(true)
        if (active) {
            addAwardToPost({ postId: postId, awardId: active }).then(res => {
                if (res.error) {
                    setLoading(false)
                    notifications.showNotification({
                        title: "Error adding the award!",
                        message: parseErrors(res.error)[0],
                        color: "red",
                        icon: <X size={18} />,
                    });
                } else {
                    setLoading(false)
                    notifications.showNotification({
                        title: "Award Rewarded",
                        message: "Your award has been added to the post and author.",
                        color: "teal",
                        icon: <Check size={18} />,
                        autoClose: 5000,
                    });
                    if (params.pId) {
                        const pId = params.pId
                        const oldData: any = queryClient.getQueryData<DataParam>(['post_details', pId])
                        const newData = oldData
                        console.log(res.data)
                        newData.data.awards = res.data
                        queryClient.setQueryData(['post_details', pId], { ...newData })
                    } else {
                        const queryKey = [getPostKey(Object.keys(params)[1]), params.author, params[Object.keys(params)[1]] === undefined ? "all" : params[Object.keys(params)[1]]]
                        const oldData: any = queryClient.getQueryData<DataParam>([...queryKey])
                        const newData = oldData
                        const postIndex = newData.data.results.findIndex((e: { id: number }) => e.id === postId)
                        newData.data.results[postIndex].awards = res.data
                        queryClient.setQueryData([...queryKey], { ...newData })
                    }
                }
            })
        }
    }

    return (
        <div className={classes.modal}>
            <Grid>
                <Grid.Col span={8}>
                    <Stack spacing="sm">
                        <SegmentedControl
                            value={price}
                            onChange={setPrice}
                            data={[
                                { label: 'Free', value: '0' },
                                { label: '$1', value: '1' },
                                { label: '$5', value: '5' },
                                { label: '$10', value: '10' },
                                { label: '$15', value: '15' },
                            ]}
                        />
                        <SimpleGrid cols={4} spacing="sm">
                            {filteredAwards.slice((LIMIT * page - LIMIT), (LIMIT * page)).map((award, i) => (
                                <Paper shadow="sm" className={cx(classes.wrapper, { [classes.active]: award.id === active, [classes.inactive]: award.id !== active })} onClick={() => setActive(award.id)} key={i}>
                                    <SVG className={classes.image} src={award.logo} preProcessor={(code) => code?.replace(/(height=".*?")|(width=".*?")/g, '')} />
                                    <Text align="center" weight={700} size="xs">{award.name}</Text>
                                </Paper>
                            ))}
                        </SimpleGrid>
                        {filteredAwards.length === 0 && (
                            <Text color="dimmed" size="xs">
                                No award available at this price
                            </Text>
                        )}
                        <Pagination page={page} onChange={setPage} total={Math.ceil(filteredAwards.length / LIMIT)} withEdges size="sm" mx="auto" />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={4}>
                    <div className={classes.stretch}>
                        {activeAward ? (
                            <>
                                <Stack spacing="xs" mb="xs">
                                    <SVG className={classes.selectedImage} src={activeAward.logo} preProcessor={(code) => code?.replace(/(height=".*?")|(width=".*?")/g, '')} />
                                    <Stack spacing={5}>
                                        <Text align="center" weight={700}>{activeAward.name}</Text>
                                        <Badge radius="xs" className={classes.badge}>$ {' '}{`${activeAward.price}`}</Badge>
                                    </Stack>
                                    <Text color="dimmed" size="xs" align="center">{activeAward.description}</Text>
                                </Stack>
                                <Button size="xs" fullWidth onClick={() => submit()} loading={loading}>Gift</Button>
                            </>
                        ) : (
                            <>
                                <Stack spacing="xs" mb="xs">
                                    <Image src="" placeholder={<Award strokeWidth={1} size={120} />} withPlaceholder height={180} fit="contain" />
                                    <Stack spacing={5}>
                                        <Text color="dimmed" size="xs" align="center">
                                            CLick a award to see preview
                                        </Text>
                                    </Stack>
                                </Stack>
                                <Button size="xs" fullWidth>Gift</Button></>
                        )}
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    );
};
