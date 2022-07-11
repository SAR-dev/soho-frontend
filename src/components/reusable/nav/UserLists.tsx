import { useState, ReactNode } from 'react';
import { createStyles, UnstyledButton, Tooltip, Avatar } from '@mantine/core';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useQuery } from 'react-query';
import { getSubscribedList } from 'src/helpers';
import { SubscriberDataParam } from '@interfaces/subscribers';
import { Link, useParams } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    container: { textAlign: "center" },
    mainLink: {
        // width: 44,
        // height: 44,
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
    const [items, setItems] = useState<SubscriberDataParam[]>()
    const { author } = useParams<"author">();

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['subscribes'], () => getSubscribedList(), {
        onSuccess: res => setItems([...res.data.results])
    })

    if (isLoading) return (<></>)

    const SortableItemC = SortableElement(({ label, i, avatar, username }: { label: string, i: number, avatar: string, username: string }) => (
        <div className={classes.placeholder}>
            <Tooltip label={label} position="right" withArrow transitionDuration={0}>
                <UnstyledButton
                    component={Link}
                    to={`/c/${username}`}
                    className={cx(classes.mainLink, { [classes.mainLinkActive]: author === username }, { [classes.initialMainLink]: i === 0 })}
                >
                    <Avatar src={avatar} size="md" radius="xl" />
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
        <SortableContainerC onSortEnd={onSortEnd} pressDelay={200} axis="y" lockAxis='y'>
            {items?.map((el, index) => (
                <SortableItemC key={index} label={`${el.author.first_name} ${el.author.last_name}`} avatar={el.author.avatar} username={el.author.username} index={index} i={index} />
            ))}
        </SortableContainerC>
    );
}