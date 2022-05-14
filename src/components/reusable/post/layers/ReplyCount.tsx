import {
  Text,
  Center,
  createStyles
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    textDecoration: 'none',
  },
}));

interface Props {
  color?: "dimmed" | "red"
}

export function ReplyCount({ color = "dimmed" }: Props) {
  const { classes } = useStyles();

  return (
    <Center component={Link} to="?post=1" className={classes.wrapper}>
      <Text size="sm" weight={500} color={color}>
        24
      </Text>
      <Text size="sm" weight={500} color={color} style={{ marginLeft: 5 }}>
        Comments
      </Text>
    </Center>
  );
}
