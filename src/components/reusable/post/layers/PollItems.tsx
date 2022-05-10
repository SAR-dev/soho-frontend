import {
  createStyles,
  Box,
  SimpleGrid,
} from "@mantine/core";

const LINK_HEIGHT = 27;

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    marginBottom: theme.spacing.lg,
  },
  pollWrapper: {
    width: "100%",
    height: 30,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
    }`,
    position: "relative",
    cursor: "pointer",
    borderRadius: 3,
    padding: 3,
    display: "flex",
    fontFamily: "sans-serif",
    fontSize: theme.fontSizes.xs,
    "&:hover": {
      borderColor: theme.colorScheme === "dark" ? theme.colors.blue[7] : theme.colors.blue[2]
    },
    [`&:hover .${getRef("pollBar")}`]: {
      backgroundColor: theme.colors.blue[7],
    },
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

function PollItem({ text }: { text: string }) {
  const { classes, cx } = useStyles();
  return (
    <Box className={classes.pollWrapper}>
      <div className={classes.pollBar}></div>
      <div className={classes.pollText}>
        <div>{text}</div>
        <div>50%</div>
      </div>
    </Box>
  );
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
