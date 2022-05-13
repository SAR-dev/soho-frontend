import { useRef, useState, useEffect } from "react";
import { createStyles, Group, Switch, Button, Select, Text, Title, Center, Stack } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { InfoCircle, Send } from "tabler-icons-react";
import { Author } from "./layers/Author";

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        position: "relative",
        padding: theme.spacing.xl,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
    },
    editorWrapper: {
        width: "100%",
    },
    commentCreatorHeader: {
        marginBottom: theme.spacing.xs
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        ['svg']: {
            marginRight: 3
        }
    }
}));

export function Comments() {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            
        </div>
    );
}
