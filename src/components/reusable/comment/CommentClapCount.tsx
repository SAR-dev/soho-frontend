import {
  Text,
  Center,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { ClapIcon } from "@reusable/ClapIcon";
import { MdWavingHand } from "react-icons/md";
import { doubleDigit } from "src/helpers";
import Lottie from 'react-lottie-player'
import animationData from 'src/animations/88219-upvote-splash-animation.json'

const useStyles = createStyles((theme, _params, getRef) => ({
  plain: {
    cursor: "default"
  },
  wrapper: {
    position: "relative"
  },
  animation: {
    position: "absolute",
    top: 0,
    marginTop: -100
  }
}))

export function CommentClapCount({ clapCount,  play, setPlay }: { clapCount: number,  play: boolean, setPlay: (params: boolean) => void }) {
  const { classes, cx } = useStyles();

  return (
    <Center className={classes.wrapper}>
      <ActionIcon variant="transparent" className={classes.plain}>
        <ClapIcon size={16} name="wave" />
      </ActionIcon>
      <Text size="sm" weight={500} style={{ marginLeft: 2 }}>
        {doubleDigit(clapCount)}
      </Text>
      {play && (
        <div className={classes.animation}>
          <Lottie
            loop={false}
            animationData={animationData}
            play
            style={{ width: 150, height: 150 }}
            onComplete={() => setPlay(false)}
          />
        </div>
      )}
    </Center>
  );
}
