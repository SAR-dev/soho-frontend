import { createStyles, Box } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
    pollWrapper: {
        width: "100%",
        height: 30,
        border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
            }`,
        position: "relative",
        borderRadius: 3,
        display: "flex",
        fontFamily: "sans-serif",
        fontSize: theme.fontSizes.xs,
    },
    pointer: {
        cursor: "pointer",
        padding: 3,
        "&:hover": {
            borderColor: theme.colorScheme === "dark" ? theme.colors.blue[7] : theme.colors.blue[2]
        },
        [`&:hover .${getRef("pollBar")}`]: {
            backgroundColor: theme.colors.blue[7],
        },
    },
    selected: {
        cursor: "pointer",
        padding: 3,
        borderColor: theme.colorScheme === "dark" ? theme.colors.blue[7] : theme.colors.blue[2],
        [`.${getRef("pollBar")}`]: {
            backgroundColor: theme.colors.blue[7],
            opacity: 0.5
        },
    },
    plain: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    },
    pollBar: {
        ref: getRef("pollBar"),
        height: "100%",
        width: "50%",
        background:
            theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[3],
        borderRadius: 1,
        opacity: 0.2
    },
    pollText: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "-webkit-fill-available",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
    },
}));

interface Params {
    text: string; 
    active: boolean;
    selected?: boolean;
}

export function Poll({ text, active, selected = false }: Params) {
    const { classes, cx } = useStyles();
    return (
        <Box className={cx(classes.pollWrapper, { [classes.pointer]: active, [classes.plain]: !active, [classes.selected]: selected })}>
            {active && (<div className={classes.pollBar}></div>)}
            <div className={classes.pollText}>
                <div>{text}</div>
                {active && (<div>50%</div>)}
            </div>
        </Box>
    );
}
