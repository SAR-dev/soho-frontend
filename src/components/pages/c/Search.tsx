import BaseLayout from '@layouts/BaseLayout'
import NavLayout from '@layouts/NavLayout'
import { ActionIcon, Checkbox, CheckboxGroup, createStyles, Grid, Group, Paper, Stack, TextInput, Center, Text, Badge, SimpleGrid, ScrollArea } from '@mantine/core'
import { getHotkeyHandler } from '@mantine/hooks';
import { CommunityCard } from '@reusable/stats/CommunityCard';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchCommunity } from 'src/helpers';
import { ArrowNarrowRight } from 'tabler-icons-react';

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
        backgroundColor: theme.colors.dark[6],
        padding: theme.spacing.md
    }
}));

const fields = [
    { name: "First Name", value: "author__first_name" },
    { name: "Last Name", value: "author__last_name" },
    { name: "Username", value: "author__username" },
    { name: "Slogan", value: "slogan" },
    { name: "Nickname of Members", value: "members_name" },
]

const allEqual = (arr: string[]) => arr.every(v => v === arr[0])

export function Search() {
    const { classes, cx } = useStyles();
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [text, setText] = useState("")
    const [value, setValue] = useState<string[]>([])
    const [valid, setValid] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const { status, data, error, isFetching, isLoading, isError } = useQuery(['search', searchTerm], () => searchCommunity({ text: searchTerm }))

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
            <Grid className={classes.fullWidth}>
                <Grid.Col span={3}>
                    <Paper className={cx(classes.mainpaper, classes.fullHeight)}>
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
                                            ['mod+S', submit],
                                        ])}
                                        rightSectionWidth={70}
                                        styles={{ rightSection: { pointerEvents: 'none' } }}
                                        rightSection={
                                            <Badge color="dark" radius="xs" size='xs'>
                                                mod+S
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
                            <SimpleGrid cols={3}>
                                {[...Array(4)].map((e, i) => <CommunityCard key={i} />)}
                            </SimpleGrid>
                        </Paper>
                    </ScrollArea>
                </Grid.Col>
            </Grid>
        </BaseLayout>
    )
}