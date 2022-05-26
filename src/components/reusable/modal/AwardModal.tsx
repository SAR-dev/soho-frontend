import { ContextModalProps } from "@mantine/modals";
import { Text, Button, Paper, SegmentedControl, Stack, Grid, SimpleGrid, Image, createStyles, Pagination, Badge } from "@mantine/core";
import { useState } from "react";
import { Award } from "tabler-icons-react";

const awards = [
  { name: "Thanos", image: "https://i.ibb.co/FYvBhzP/u8s1fub2ie811.png" },
  { name: "Reddit", image: "https://i.ibb.co/h2ygtnk/ttnlz137kqby.webp" },
  { name: "Golden Badge", image: "https://i.ibb.co/7jfCjsR/award-gold-large.png" },
  { name: "Badass", image: "https://i.ibb.co/fNpwLm8/community-Icon-2cbkzwfs6kr21.png" },
  { name: "Love", image: "https://i.ibb.co/p0L45v9/5nswjpyy44551-Ally.png" },
  { name: "Legendary 19", image: "https://i.ibb.co/C7BsQ4S/V9-EFxka-Q0-Gf-Kon-Wyn3gjimsn-AMh3-SPXFQe-Ikp-Kn-NP7-Y.webp" },
  { name: "Premium", image: "https://i.ibb.co/4RDH6SC/image.png" },
  { name: "Pyramid", image: "https://i.ibb.co/sw0TgcW/image.png" },
]

const useStyles = createStyles((theme, _params, getRef) => ({
  modal: { width: 650 },
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    paddingBottom: theme.spacing.sm,
    cursor: "pointer",
    '&:hover': {
      backgroundColor: theme.colors.blue[5],
      color: theme.colors.dark[9]
    },
  },
  image: {
    padding: theme.spacing.sm
  },
  badge: {
    width: 50,
    margin: "auto"
  },
  giftButton: {
    width: "100%"
  },
  stretch: {
    flexDirection: "column",
    justifyContent: "space-between",
    display: "flex",
    height: "100%"
  }
}));

export const AwardModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps) => {
  const { classes, cx } = useStyles();
  const [value, setValue] = useState('0');
  const [page, setPage] = useState(1)
  return (
    <div className={classes.modal}>
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
                  <Image className={classes.image} src={award.image} placeholder={<Award strokeWidth={1} size={50} />} withPlaceholder height={65} fit="contain" />
                  <Text align="center" weight={700} size="xs">{award.name}</Text>
                </Paper>
              ))}

            </SimpleGrid>
            <Pagination page={page} onChange={setPage} total={10} withEdges size="sm" mx="auto" />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className={classes.stretch}>
            <Stack spacing="sm">
              <Image src="https://i.ibb.co/sw0TgcW/image.png" placeholder={<Award strokeWidth={1} size={120} />} withPlaceholder height={120} fit="contain" />
              <Stack spacing={5}>
                <Text align="center" weight={700}>Legendary Pokemon</Text>
                <Badge radius="xs" className={classes.badge}>FREE</Badge>
              </Stack>
              <Text color="dimmed" size="xs" align="center">Arceus is a 2022 action role-playing game developed by Game Freak and published by Nintendo and The Pokémon Company for the Nintendo Switch.</Text>
            </Stack>
            <Button size="xs" fullWidth>Gift</Button>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};
