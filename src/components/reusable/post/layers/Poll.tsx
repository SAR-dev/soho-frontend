import { Choice } from "../../../interfaces/post";
import { createStyles, Box, Loader } from "@mantine/core";
import { useState } from "react";
import { selectPoll } from "../../../../helpers";
import { ChoicePostDataInterface } from "@interfaces/poll";
import { useNotifications } from "@mantine/notifications";
import { X } from "tabler-icons-react";

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
            backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.5),
        },
    },
    selected: {
        padding: 3,
        borderColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.5) : theme.colors.blue[2],
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
        [`.${getRef("pollBar")}`]: {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.5)
                    : theme.colors[theme.primaryColor][1],
        },
    },
    plain: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
        pointerEvents: "none"
    },
    pollBar: {
        ref: getRef("pollBar"),
        height: "100%",
        width: "50%",
        background:
            theme.colorScheme === "dark"
                ? theme.fn.rgba(theme.colors.dark[3], .25)
                : theme.fn.rgba(theme.colors.gray[3], .25),
        borderRadius: 1,
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
        letterSpacing: .35
    },
}));

interface Params {
    active?: boolean;
    selected?: boolean;
    choice?: Choice;
    data?: ChoicePostDataInterface;
    setData?: (params: any) => void;
}

export function Poll({ active = true, selected = false, choice, data, setData }: Params) {
    const { classes, cx } = useStyles();
    const notifications = useNotifications();

    const [loading, setLoading] = useState(false)

    const upvotePoll = () => {
        setLoading(true)
        if (data?.postId && choice?.id) {
            selectPoll({ postId: data?.postId, pollId: choice?.id }).then(res => {
                if (res.error) {
                    setLoading(false)
                    notifications.showNotification({
                        title: "Error creating the comment!",
                        message: "Couldn't vote in the poll. If there is any problem, fix it. Try again.",
                        color: "red",
                        icon: <X size={18} />,
                    });
                } else {
                    setLoading(false)
                    if (res.data.upvoted && setData) {
                        setData({ ...data, choices_voted: choice.id })
                    }
                }
            })
        }
    }
    return (
        <Box className={cx(classes.pollWrapper,
            {
                [classes.pointer]: active,
                [classes.plain]: !active || loading,
                [classes.selected]: data?.choices_voted === choice?.id
            })}
            onClick={() => upvotePoll()}
        >
            {active && (<div className={classes.pollBar}></div>)}
            <div className={classes.pollText}>
                <div>{choice?.text}</div>
                {loading && (
                    <Loader size="xs" ml="auto" mr="xs" />
                )}
                {active && (<div>50%</div>)}
            </div>
        </Box>
    );
}
