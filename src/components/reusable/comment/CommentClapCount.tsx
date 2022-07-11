import {
  Text,
  Center,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { ClapIcon } from "@reusable/ClapIcon";
import { MdWavingHand } from "react-icons/md";
import { doubleDigit } from "src/helpers";


const useStyles = createStyles((theme, _params, getRef) => ({
  plain: {
    cursor: "default"
  }
}))

export function CommentClapCount({ clapCount }: { clapCount: number }) {
  const { classes, cx } = useStyles();

  return (
    <Center>
      <ActionIcon variant="transparent" className={classes.plain}>
        <ClapIcon size={16} name="wave" />
      </ActionIcon>
      <Text size="sm" weight={500} style={{ marginLeft: 2 }}>
        {doubleDigit(clapCount)}
      </Text>
    </Center>
  );
}
