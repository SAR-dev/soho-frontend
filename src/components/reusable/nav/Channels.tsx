import { Category, SubCategory } from '@interfaces/category';
import { Box, Collapse, createStyles, Text, ThemeIcon } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getChannels } from '../../../helpers';
import { ChannelHeader, ChannelLinksGroup, SubChannelHeader, SubChannelLinksGroup } from './LinksGroup';
import Nestable from 'react-nestable';
import Emoji from 'react-emoji-render';
import {
    SortableContainer,
    SortableElement,
    arrayMove
} from "react-sortable-hoc";

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

export const SortableContainerC = SortableContainer(({ children }: { children: ReactNode }) => {
    const { classes } = useStyles();
    return <div className={classes.container}>{children}</div>;
});

export const SortableItemC = SortableElement(({ children }: { children: ReactNode }) => {
    return <div>{children}</div>;
});

export function Channels({ editing, setEditing }: { editing: boolean, setEditing: (params: boolean) => void }) {
    const { author } = useParams<"author">();
    const { classes } = useStyles();
    const [nested, setNested] = useState<Category[]>()

    const { status, data, error, isFetching, isLoading, isError } = useQuery<DataParam, Error>(['channels', author], () => getChannels({ username: author }), {
        onSuccess: res => {
            setNested(res.data.results.map(e => {
                return { ...e, children: e.sub_categories }
            }))
        }
    })

    if (isLoading) return <></>
    if (isError) return <></>

    function onSortEnd({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }): any {
        // if (items) {
        //     const res = arrayMove(items, oldIndex, newIndex)
        //     setItems(res)
        //     setSubs(res.map(e => e.id))
        // }
        console.log(oldIndex, newIndex)
    };

    function getStartIndex(i: number): number {
        if (data) {
            if (i === 0) {
                return 0
            } else {
                return data?.data.results.slice(0, i).reduce(
                    (acc, obj) => acc + obj.sub_categories.length,
                    0
                );
            }
        } else return 0
    }

    return (
        <div className={classes.linksInner}>
            <SortableContainerC onSortEnd={onSortEnd} pressDelay={200} axis="y" lockAxis='y'>
                {editing ? (
                    <>
                        {data && data.data.results.map((item, i) => (
                            <ChannelLinksGroup {...item} author={author} editing={editing} key={i} startIndex={getStartIndex(i)} />
                        ))}
                    </>
                ) : (
                    <>
                        {data && data.data.results.filter(e => e.name !== 'default').map((item, i) => (
                            <ChannelLinksGroup {...item} author={author} editing={editing} key={i} startIndex={getStartIndex(i)} />
                        ))}
                        {data && data.data.results.find(e => e.name === 'default')?.sub_categories.map((item, i) => (
                            <SortableItemC key={i} index={i} >
                                <SubChannelLinksGroup sub_category={item} author={author} />
                            </SortableItemC>
                        ))}
                    </>
                )}
            </SortableContainerC>
        </div>
    );
}