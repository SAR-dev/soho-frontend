import { useState, useCallback } from "react";
import {
    createStyles,
    Image,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Spoiler,
    Anchor,
    SegmentedControl,
    Center,
    Box,
    Chip,
    Button,
    ActionIcon,
    SimpleGrid,
} from "@mantine/core";

const LINK_HEIGHT = 30;

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        marginBottom: theme.spacing.lg,
    },
    link: {
        ...theme.fn.focusStyles(),
        position: 'relative',
        fontFamily: 'sans-serif',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        cursor: 'pointer',
        paddingLeft: theme.spacing.sm,
        lineHeight: `${LINK_HEIGHT}px`,
        fontSize: theme.fontSizes.xs,
        height: LINK_HEIGHT,
        borderTopRightRadius: theme.radius.sm,
        borderBottomRightRadius: theme.radius.sm,
        borderLeft: `4px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3]
            }`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
          },
        [`&:hover .${getRef('title')}`]: {
            transform: 'translateX(5px)',
        },
    },

    linkActive: {
    },
    pollitem: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        backgroundColor: theme.colors[theme.primaryColor][7],
        opacity: 0.1,
    },
    title: {
        ref: getRef('title'),
        transition: 'transform 300ms ease-in-out',
    },
    count: {
        marginLeft: 'auto',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
        paddingRight: theme.spacing.sm,
    }
}));

function PollItem({ text }: { text: string }) {
    const { classes, cx } = useStyles();
    return (
        <Box
            className={cx(classes.link, classes.linkActive)}
        >
            <div className={classes.pollitem} />
            <div className={classes.title}>
            {text}
            </div>
            <div className={classes.count}>50%</div>
        </Box>
    )
}

export function PollItems() {
    const { classes, cx } = useStyles();


    return (
        <div className={classes.wrapper}>
            <SimpleGrid cols={1} spacing="sm">
                <PollItem text="React Native" />
                <PollItem text="Vue Js" />
                <PollItem text="Python" />
            </SimpleGrid>
        </div>
    );
}
