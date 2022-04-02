import { useState } from 'react';
import { createStyles, UnstyledButton, Tooltip, Title, Avatar } from '@mantine/core';
import { useListState } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
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
}));

const mainLinksMockdata = [
    { label: 'pepperonigown' },
    { label: 'centorchid' },
    { label: 'swampgeek' },
    { label: 'wallyleast' },
    { label: 'decreaseassess' },
    { label: 'journalinspector' },
    { label: 'adidasvideo' },
    { label: 'withinjellied' },
    { label: 'carillonturkish' },
    { label: 'parrelrecipe' },
    { label: 'provisionfretful' },
    { label: 'marbledtomorrow' },
    { label: 'sugarplumvacant' },
    { label: 'surfacebalk' },
    { label: 'victoriousprogram' },
    { label: 'etherealhop' },
    { label: 'shirtwig' },
    { label: 'naturesounder' },
    { label: 'watchfullistener' },
    { label: 'ecstaticglistening' },
    { label: 'shiveradmired' },
    { label: 'golfereye' },
    { label: 'bavintea' },
    { label: 'seedlingsaddle' },
];

export default function UserLists() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Releases');
    const [state, handlers] = useListState(mainLinksMockdata);

    const items = state.map((link, i) => (
        <Tooltip label={link.label} position="right" withArrow transitionDuration={0} key={i}>
            <UnstyledButton
                onClick={() => setActive(link.label)}
                className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === active }, { [classes.initialMainLink]: i === 0 })}
            >
                <Avatar src={"https://avatars.dicebear.com/api/micah/seed" + i + ".svg"} size={"sm"} />
            </UnstyledButton>
        </Tooltip>
    ))

    return (
        <>
            {items}
        </>
    );
}