import { AuthorDataParam } from "@interfaces/author";
import { createStyles, Avatar, Indicator } from "@mantine/core";
import { HiBadgeCheck } from "react-icons/hi";

const useStyles = createStyles((theme, _params, getRef) => ({
  avatarWrapper: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    borderRadius: "100%",
    padding: 3,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
    ["img"]: {
      borderRadius: "100%",
    },
  },
}));

export function Author({...props}: AuthorDataParam) {
  const { classes } = useStyles();

  return (
    <div className={classes.avatarWrapper}>
      {/* <Indicator
        inline
        size={18}
        offset={10}
        position="bottom-end"
        className="circular"
        withBorder
        style={{zIndex: 2}}
      > */}
        <Avatar
          size={60}
          src={props.avatar}
          alt={`${props.first_name} ${props.last_name}`}
          className={classes.avatar}
        />
      {/* </Indicator> */}
    </div>
  );
}
