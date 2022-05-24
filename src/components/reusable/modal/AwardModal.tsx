import { ContextModalProps } from "@mantine/modals";
import { Text, Button, Paper, SegmentedControl, Stack, Grid, SimpleGrid, Image, createStyles } from "@mantine/core";
import { useState } from "react";

const awards = [
  { name: "Thanos", image: "https://i.ibb.co/FYvBhzP/u8s1fub2ie811.png" },
  { name: "Reddit", image: "https://i.ibb.co/h2ygtnk/ttnlz137kqby.webp" },
  { name: "Golden Badge", image: "https://i.ibb.co/7jfCjsR/award-gold-large.png" },
  { name: "Badass", image: "https://i.ibb.co/fNpwLm8/community-Icon-2cbkzwfs6kr21.png" },
  { name: "Love", image: "https://i.ibb.co/p0L45v9/5nswjpyy44551-Ally.png" },
  { name: "Legendary 19", image: "https://i.ibb.co/C7BsQ4S/V9-EFxka-Q0-Gf-Kon-Wyn3gjimsn-AMh3-SPXFQe-Ikp-Kn-NP7-Y.webp" },
  {name: "Premium", image: "https://i.ibb.co/4RDH6SC/image.png"},
  {name: "Pyramid", image: "https://i.ibb.co/sw0TgcW/image.png"},
]

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    paddingBottom: theme.spacing.sm
  },
  image: {
    padding: theme.spacing.sm
  }
}));

export const AwardModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps) => {
  const { classes, cx } = useStyles();
  const [value, setValue] = useState('0');
  return (
    <>
      <Grid>
        <Grid.Col span={8}>
          <Stack spacing="sm">
            <SegmentedControl
              value={value}
              onChange={setValue}
              data={[
                { label: 'Popular', value: '0' },
                { label: 'Free', value: '1' },
                { label: '$1', value: '2' },
                { label: '$5', value: '3' },
                { label: '$10', value: '4' },
                { label: '$15', value: '5' },
              ]}
            />
            <SimpleGrid cols={4} spacing="sm">
              {awards.map((award, i) => (
                <Paper shadow="sm" className={classes.wrapper}>
                  <Image className={classes.image} src={award.image} withPlaceholder height={65} fit="contain" />
                  <Text align="center" weight={700} size="xs">{award.name}</Text>
                </Paper>
              ))}

            </SimpleGrid>
            {/* <Paper>{innerProps.modalBody}</Paper> */}

          </Stack>
        </Grid.Col>
        <Grid.Col span={4}></Grid.Col>
      </Grid>
      <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
        Close modal
      </Button>
    </>
  );
};
