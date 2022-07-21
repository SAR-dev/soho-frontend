import { Category } from '@interfaces/category';
import { createStyles, Space } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getChannels } from '../../../helpers';
import { Channel, SubChannel } from './LinksGroup';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const useStyles = createStyles((theme) => ({
    control: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: theme.fontSizes.xs,
        padding: `8px ${theme.spacing.xs}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
    },
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
    container: { textAlign: "center" },
    placeholder: { zIndex: 100 },
    cat: {
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
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

export function Channels({ setDefaultSlug }: { setDefaultSlug: (params: string) => void }) {
    const { author } = useParams<"author">();
    const { classes } = useStyles();

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['channels', author], () => getChannels({ username: author }), {
        onSuccess: res => {
            const def = res.data.results.find(e => e.name === "default")
            if(def) setDefaultSlug(def.slug)
        }
    })

    if (isLoading) return <></>
    if (isError) return <></>

    return (
        <div className={classes.linksInner}>
            {data && data.data.results.map((item, i) => (
                <Channel {...item} author={author} key={i} />
            ))}
            {/* <Space h="xs" /> */}
            {/* {data && data.data.results.find(e => e.name === 'default')?.sub_categories.map((item, i) => (
                <SubChannel sub_category={item} author={author} chevron={true} key={i} />
            ))} */}
        </div>
    );
}