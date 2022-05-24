import { createStyles, Text, Group } from "@mantine/core";
import { Clock } from "tabler-icons-react";
import { GoFlame } from "react-icons/go";

const useStyles = createStyles((theme, _params, getRef) => ({
  flex: {
    display: "flex",
    alignItems: "center",
  },
  time: {
    marginLeft: 3,
  },
  fire: {
    color: theme.colors.red[5],
  },
}));

interface Props {
  author: {
    name: string;
    image: string;
  };
  temp: string;
  postedAt: string;
}

export function PostHeader({ ...props }: Props) {
  const { classes, cx } = useStyles();
  return (
    <Group spacing="sm">
      <Text size="sm" weight={700}>
        {props.author.name}
      </Text>
      <div className={cx(classes.flex, classes.fire)}>
        <GoFlame size={16} />
        <Text size="sm" weight={700} className={classes.time}>
          {props.temp}&deg;C
        </Text>
      </div>

      <div className={classes.flex}>
        <Clock size={16} />
        <Text size="sm" color="dimmed" weight={700} className={classes.time}>
          {props.postedAt}
        </Text>
      </div>
    </Group>
  );
}
