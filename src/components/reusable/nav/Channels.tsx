import { createStyles } from '@mantine/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import sortArray from 'sort-array';
import { getChannels } from '../../../helpers';
import { LinksGroup } from './LinksGroup';

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
        results: Result[];
    }
}

interface Result {
    id: number;
    color: string;
    name: string;
    slug: string;
    about: null;
    sub_categories: SubCategory[];
}

interface SubCategory {
    id: number;
    name: string;
    slug: string;
}

export function Channels() {
    const { author } = useParams<"author">();
    const { classes } = useStyles();
    const [channels, setChannels] = useState<Result[]>()
    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['channels', author], () => getChannels({username: author}), {
        onSuccess: res => {
            setChannels([...res.data.results])
        }
    })

    if(isLoading) return <></>
    if(isError) return <></>

    return (
        <div className={classes.linksInner}>
            {channels && sortArray(channels, { by: "name" }).map((item, i) => <LinksGroup {...item} author={author} key={i} />)}
        </div>
    );
}