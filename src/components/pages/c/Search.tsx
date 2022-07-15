import BaseLayout from '@layouts/BaseLayout'
import NavLayout from '@layouts/NavLayout'
import { ActionIcon, Checkbox, CheckboxGroup, createStyles, Grid, Group, Paper, Stack, TextInput, Center, Text, Badge, SimpleGrid, ScrollArea } from '@mantine/core'
import { getHotkeyHandler } from '@mantine/hooks';
import { HeaderMenu } from '@reusable/nav/HeaderMenu';
import { CommunityCard, CommunityPlaceholderCard } from '@reusable/stats/CommunityCard';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchCommunity } from 'src/helpers';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { CommunityDataParam, CommunitySearchDataParam } from "@interfaces/community"

const useStyles = createStyles((theme) => ({
    fullWidth: {
        width: "100%"
    },
    fullHeight: {
        height: "100vh",
    },
    mainpaper: {
        width: "100%",
        display: "flex",
        borderRadius: 0,
        padding: theme.spacing.md
    },
    bgLight: {
        backgroundColor: theme.colors.dark[6],
    }
}));

const fields = [
    { name: "Username", value: "author__username__icontains" },
    { name: "First Name", value: "author__first_name__icontains" },
    { name: "Last Name", value: "author__last_name__icontains" },
    { name: "Slogan", value: "slogan__icontains" },
    { name: "Nickname of Members", value: "members_name__icontains" },
]

const allEqual = (arr: string[]) => arr.every(v => v === arr[0])

export interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: CommunitySearchDataParam[];
    }
}

export function Search() {
    const { classes, cx } = useStyles();
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [text, setText] = useState("")
    const [value, setValue] = useState<string[]>([])
    const [valid, setValid] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['search', searchTerm], () => searchCommunity({ text: searchTerm }))

    useEffect(() => {
        const arr: string[] = []
        const val: string[] = []
        fields.forEach(e => {
            const temp = searchParams.get(e.value)
            if (temp) {
                arr.push(e.value)
                val.push(temp)
            }
        })
        setValue([...arr])
        setValid(allEqual(val))
        if (allEqual(val)) {
            setText(val[0])
        }
    }, [searchParams])

    useEffect(() => {
        const params: string[] = []
        value.forEach(e => params.push(`${e}=${text}`))
        setSearchTerm(params.join("&"))
    }, [value])

    const submit = () => {
        navigate(`/c/search?${searchTerm}`)
    }

    return (
        <BaseLayout>
            <div className={classes.fullWidth}>
                <HeaderMenu NavHeight={50} />
                <Grid className={classes.fullWidth} gutter={0}>
                    <Grid.Col span={3}>
                        <Paper className={cx(classes.mainpaper, classes.fullHeight, classes.bgLight)}>
                            <Stack className={classes.fullWidth}>
                                <div>
                                    <Text size='sm' weight={600} mb={5}>Search Keywords</Text>
                                    <Center>
                                        <TextInput
                                            placeholder="Type keywords"
                                            size="xs"
                                            className={cx(classes.fullWidth, 'thick-border')}
                                            value={text}
                                            onChange={e => setText(e.target.value)}
                                            onKeyDown={getHotkeyHandler([
                                                ['mod+Enter', submit],
                                            ])}
                                            rightSectionWidth={90}
                                            styles={{ rightSection: { pointerEvents: 'none' } }}
                                            rightSection={
                                                <Badge color="dark" radius="xs" size='xs'>
                                                    mod+Enter
                                                </Badge>
                                            }
                                        />
                                        <ActionIcon color="blue" variant="filled" ml="sm" onClick={() => submit()}>
                                            <ArrowNarrowRight size={16} />
                                        </ActionIcon>
                                    </Center>
                                </div>
                                <CheckboxGroup
                                    value={value}
                                    onChange={setValue}
                                    orientation="vertical"
                                    label="Search Options"
                                    description="Check fields you want to search"
                                >
                                    {fields.map((e, i) => <Checkbox value={e.value} label={e.name} key={i} />)}
                                </CheckboxGroup>
                            </Stack>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <ScrollArea style={{ height: "100vh" }}>
                            <Paper className={classes.mainpaper}>
                                <SimpleGrid cols={2} className={classes.fullWidth}>
                                    {isLoading && [...Array(9)].map((e, i) => <CommunityPlaceholderCard key={i} />)}
                                    {data?.data.results.map((community, i) => <CommunityCard {...community} key={i} />)}
                                </SimpleGrid>
                            </Paper>
                        </ScrollArea>
                    </Grid.Col>
                </Grid>
            </div>
        </BaseLayout>
    )
}