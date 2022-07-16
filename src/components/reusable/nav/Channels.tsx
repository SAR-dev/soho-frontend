import { Category } from '@interfaces/category';
import { createStyles } from '@mantine/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import sortArray from 'sort-array';
import { getChannels } from '../../../helpers';
import { ChannelLinksGroup, SubChannelLinksGroup } from './LinksGroup';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    linksInner: {
        paddingLeft: theme.spacing.md - theme.spacing.xs,
        paddingRight: theme.spacing.md - theme.spacing.xs,
        paddingBottom: theme.spacing.md,
    },

    footer: {
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },
}));


interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: Category[];
    }
}

export function Channels() {
    const { author } = useParams<"author">();
    const { classes } = useStyles();
    const [channels, setChannels] = useState<Category[]>()
    const [defaultChannel, setDefaultChannel] = useState<Category>()

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['channels', author], () => getChannels({username: author}), {
        onSuccess: res => {
            const def = res.data.results.find(e => e.name === 'default')
            const rest = res.data.results.filter(e => e.name !== 'default')
            setDefaultChannel(def)
            setChannels([...rest])
        }
    })

    if(isLoading) return <></>
    if(isError) return <></>

    return (
        <div className={classes.linksInner}>
            {data && sortArray(data.data.results.filter(e => e.name !== 'default'), { by: "name" }).map((item, i) => <ChannelLinksGroup {...item} author={author} key={i} />)}
            {data && <SubChannelLinksGroup category={data.data.results.find(e => e.name === 'default')} author={author} />}
        </div>
    );
}