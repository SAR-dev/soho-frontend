import { createStyles } from '@mantine/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import sortArray from 'sort-array';
import {
    Notes,
    CalendarStats,
    Gauge,
    PresentationAnalytics,
    FileAnalytics,
    Adjustments,
    Lock,
} from 'tabler-icons-react';
import { getChannels } from '../../../helpers';
import { LinksGroup } from './LinksGroup';

const mockdata = [
    { label: 'Dashboard', icon: Gauge },
    {
        label: 'Market news',
        icon: Notes,
        initiallyOpened: false,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Forecasts', link: '/' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
        ],
    },
    {
        label: 'Releases',
        icon: CalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', icon: PresentationAnalytics },
    { label: 'Contracts', icon: FileAnalytics },
    { label: 'Settings', icon: Adjustments },
    {
        label: 'Security',
        icon: Lock,
        initiallyOpened: true,
        links: [
            { label: 'Enable 2FA', link: '/' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },
];

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
    count: number;
    next: null;
    previous: null;
    results: Result[];
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
    const { cName } = useParams<"cName">();
    const { classes } = useStyles();
    const [channels, setChannels] = useState<Result[]>()
    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['channels', cName], () => getChannels(cName),  {
        onSuccess: data => {
            setChannels([...data.results])
        }
    })

    return (
        <div className={classes.linksInner}>
            {channels && sortArray(channels, { by: "name" }).map((item, i) => <LinksGroup {...item} key={i} />)}
        </div>
    );
}