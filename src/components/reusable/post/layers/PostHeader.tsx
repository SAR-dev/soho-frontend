import { createStyles, Text, Group, Stack } from "@mantine/core";
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
}));

interface Props {
  name: string;
  image: string;
  temp: number;
  postedAt: string;
}

export function PostHeader({ ...props }: Props) {
  const { classes, cx } = useStyles();
  return (
    <Stack spacing={3}>
      <Group spacing="xs">
        <Text size="sm" weight={700}>
          {props.name}
        </Text>

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
        
      </Group>
    </Stack>
  );
}
