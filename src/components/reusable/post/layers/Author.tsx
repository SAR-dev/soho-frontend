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

export function Author() {
  const { classes } = useStyles();

  return (
    <div className={classes.avatarWrapper}>
      <Indicator
        inline
        size={18}
        offset={10}
        position="bottom-end"
        className="circular"
        label={<HiBadgeCheck />}
        withBorder
        style={{zIndex: 2}}
      >
        <Avatar
          size={60}
          src="https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png"
          alt="Sayed Rafi"
          className={classes.avatar}
        />
      </Indicator>
    </div>
  );
}
