import { AvailableAward, Award } from "@interfaces/post";
import { Group, Button, Modal, createStyles } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useState } from "react";
import { Eye, Plus } from "tabler-icons-react";
import { PostAwardModal } from "./PostAwardModal";
import SVG, { Props as SVGProps } from "react-inlinesvg";
import { AwardPopover } from "./AwardPopover";

const useStyles = createStyles((theme, _params, getRef) => ({
  selectedImage: {
    objectFit: 'contain',
    height: 12
  }
}));

export function AwardCount({ available_awards, postId, awards }: { available_awards: AvailableAward[], postId: number, awards: Award[] }) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);

  const getAwardCount = (id: number) => {
    return awards.filter(e => e.award === id).length
  }

  return (
    <>
      <Group spacing={2}>
        {available_awards?.map((e, i) => (
          <div key={i}>
            {getAwardCount(e.id) !== 0 && (
              <AwardPopover award={e} count={getAwardCount(e.id)} />
            )}
          </div>
        ))}
        <Button
          styles={(theme) => ({
            root: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[2],
            },
            leftIcon: {
              marginRight: 5,
            },
          })}
          size="xs"
          compact
          leftIcon={<Plus size={12} />}
          onClick={() => setOpened(true)}
        >
          Award
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Our Awards Collection"
      >
        <PostAwardModal available_awards={available_awards} postId={postId} />
      </Modal>
    </>
  );
}
