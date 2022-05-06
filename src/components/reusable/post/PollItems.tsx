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
  pollWrapper: {
    width: "100%",
    height: 30,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[3]
    }`,
    position: "relative",
    cursor: "pointer",
    borderRadius: 3,
    padding: 3,
    display: "flex",
    fontFamily: "sans-serif",
    fontSize: theme.fontSizes.xs,
    "&:hover": {
      borderColor: theme.colorScheme === "dark" ? theme.colors.blue[5] : theme.colors.blue[2]
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
  // link: {
  //   ...theme.fn.focusStyles(),
  //   position: "relative",
  //   fontFamily: "sans-serif",
  //   display: "flex",
  //   alignItems: "center",
  //   textDecoration: "none",
  //   cursor: "pointer",
  //   paddingLeft: theme.spacing.sm,
  //   lineHeight: `${LINK_HEIGHT}px`,
  //   fontSize: theme.fontSizes.xs,
  //   height: LINK_HEIGHT,
  //   borderTopRightRadius: theme.radius.sm,
  //   borderBottomRightRadius: theme.radius.sm,
  // borderLeft: `4px solid ${
  //   theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[3]
  // }`,
  //   backgroundColor:
  //     theme.colorScheme === "dark"
  //       ? theme.colors.dark[6]
  //       : theme.colors.gray[0],
    // "&:hover": {
    //   backgroundColor:
    //     theme.colorScheme === "dark"
    //       ? theme.colors.dark[7]
    //       : theme.colors.gray[1],
    // },
    // [`&:hover .${getRef("title")}`]: {
    //   transform: "translateX(5px)",
    // },
  // },

  // linkActive: {},
  // pollitem: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   width: "50%",
  //   height: "100%",
  //   backgroundColor: theme.colors[theme.primaryColor][7],
  //   opacity: 0.1,
  // },
  // title: {
  //   ref: getRef("title"),
  //   transition: "transform 300ms ease-in-out",
  // },
  // count: {
  //   marginLeft: "auto",
  //   fontSize: theme.fontSizes.xs,
  //   fontWeight: 700,
  //   paddingRight: theme.spacing.sm,
  // },
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
