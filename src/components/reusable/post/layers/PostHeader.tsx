import { createStyles, Text, Group } from "@mantine/core";
import { ReactNode } from "react";
import { GoFlame } from "react-icons/go";
import { IoTimer } from "react-icons/io5";

const useStyles = createStyles((theme, _params, getRef) => ({
  flex: {
    display: "flex",
    alignItems: "center",
  },
  time: {
    marginLeft: 3,
  },
  fire: {
    color: theme.colors.red[3],
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: "100%",
    background: "#fff",
    marginLeft: -8,
    marginRight: -8
  }
}));

interface Props {
  name: string;
  image: string;
  temp: number;
  postedAt: string;
  rightSection?: ReactNode;
}

export function PostHeader({ ...props }: Props) {
  const { classes, cx } = useStyles();
  return (
      <Group>
        <Text size="sm" weight={700}>
          {props.name}
        </Text>
        <div className={classes.circle}></div>
        <div className={cx(classes.flex, classes.fire)}>
          <GoFlame size={14} />
          <Text size="xs" className={classes.time}>
            {props.temp}&deg;C
          </Text>
        </div>

        <div className={classes.flex}>
          <IoTimer size={14} />
          <Text size="xs" color="dimmed" className={classes.time}>
            {props.postedAt}
          </Text>
        </div>

        {props.rightSection}
      </Group>
  );
}
