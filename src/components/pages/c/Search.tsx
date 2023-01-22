import BaseLayout from '@layouts/BaseLayout'
import NavLayout from '@layouts/NavLayout'
import { ActionIcon, Checkbox, CheckboxGroup, createStyles, Grid, Group, Paper, Stack, TextInput, Center, Text, Badge, SimpleGrid, ScrollArea } from '@mantine/core'
import { getHotkeyHandler } from '@mantine/hooks';
import { HeaderMenu } from '@reusable/nav/HeaderMenu';
import { CommunityCard, CommunityPlaceholderCard } from '@reusable/stats/CommunityCard';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
    const navigate = useNavigate();

    const { query } = useParams<"query">();
    const [text, setText] = useState(query)

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['search', text], () => searchCommunity({ text: text }))

    const handleChange = (val: string) => {
        setText(val)
        navigate(`/search/${val}`)
    }

    return (
        <BaseLayout>
            <div className={classes.fullWidth}>
                <HeaderMenu NavHeight={50} />
                <Grid className={classes.fullWidth} gutter={0}>
                    <Grid.Col span={2}>
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
                                            onChange={e => handleChange(e.target.value)}
                                            rightSectionWidth={90}
                                            styles={{ rightSection: { pointerEvents: 'none' } }}
                                        />
                                    </Center>
                                </div>
                            </Stack>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <ScrollArea style={{ height: "100vh" }}>
                            <Paper className={classes.mainpaper}>
                                <SimpleGrid cols={3} className={classes.fullWidth}>
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