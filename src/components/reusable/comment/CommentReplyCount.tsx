import {
  Text,
  Center,
  createStyles
} from "@mantine/core";
import { Link } from "react-router-dom";
import { doubleDigit } from "src/helpers";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    textDecoration: 'none',
  },
}));

export function CommentReplyCount({ commentsCount, color = "dimmed" }: {
  color?: "dimmed" | "red",
  commentsCount: number
}) {
  const { classes } = useStyles();

  return (
    <Center className={classes.wrapper}>
      <Text size="sm" weight={500} color={color}>
        {doubleDigit(commentsCount)}
      </Text>
      <Text size="sm" weight={500} color={color} style={{ marginLeft: 5 }}>
        Replies
      </Text>
    </Center>
  );
}
