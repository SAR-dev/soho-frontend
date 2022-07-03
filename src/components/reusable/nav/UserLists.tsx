import { useState, ReactNode } from 'react';
import { createStyles, UnstyledButton, Tooltip, Title, Avatar, Image, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useQuery } from 'react-query';
import { getSubscribedList } from 'src/helpers';
import { SubscriberDataParam } from '@interfaces/subscribers';
import initials from 'initials';

const useStyles = createStyles((theme) => ({
    container: { textAlign: "center" },
    mainLink: {
        width: 44,
        height: 44,
        borderRadius: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        marginBottom: theme.spacing.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "transparent",
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4],
        },
    },

    initialMainLink: {
        marginTop: theme.spacing.md,
    },

    mainLinkActive: {
        '&': {
            borderColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][1],
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][1],
        },
        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][1],
        },
    },
    placeholder: { zIndex: 100 }
}));

export interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: SubscriberDataParam[];
    }
}

export default function UserLists() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Releases');
    const [items, setItems] = useState<SubscriberDataParam[]>()

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['subscribes'], () => getSubscribedList(), {
        onSuccess: res => setItems([...res.data.results])
    })

    if (isLoading) return (<></>)

    const SortableItemC = SortableElement(({ label, i, avatar }: { label: string, i: number, avatar: string }) => (
        <div className={classes.placeholder}>
            <Tooltip label={label} position="right" withArrow transitionDuration={0}>
                <UnstyledButton
                    onClick={() => setActive(label)}
                    className={cx(classes.mainLink, { [classes.mainLinkActive]: label === active }, { [classes.initialMainLink]: i === 0 })}
                >
                    <Image src={avatar} height="sm" width="sm" fit="cover" withPlaceholder />
                </UnstyledButton>
            </Tooltip>
        </div>
    ));

    const SortableContainerC = SortableContainer(({ children }: { children: ReactNode }) => {
        return <div className={classes.container}>{children}</div>;
    });

    function onSortEnd({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }): any {
        if (items) {
            const res = arrayMove(items, oldIndex, newIndex)
            setItems(res)
        }
    };

    return (
        <SortableContainerC onSortEnd={onSortEnd} pressDelay={200}>
            {items?.map((el, index) => (
                <SortableItemC key={index} label={`${el.author.first_name} ${el.author.last_name}`} avatar={el.author.avatar} index={index} i={index} />
            ))}
        </SortableContainerC>
    );
}