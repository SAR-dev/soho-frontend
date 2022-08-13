import { createStyles, Text, Group, Stack, Menu, ActionIcon } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { GoFlame } from "react-icons/go";
import { IoTimer } from "react-icons/io5";
import { Edit, Trash } from "tabler-icons-react";

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
  setEditorModal: (params: boolean) => void
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
        <Menu ml="auto" control={
          <ActionIcon title="Post Options">
            <BsThreeDots size={18} />
          </ActionIcon>}
        >
          <Menu.Item icon={<Edit size={14} />} onClick={() => props.setEditorModal(true)}>Update</Menu.Item>
          <Menu.Item icon={<Trash size={14} />}>Delete</Menu.Item>
        </Menu>
      </Group>
    </Stack>
  );
}
