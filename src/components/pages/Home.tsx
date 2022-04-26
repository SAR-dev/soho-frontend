import { Box, createStyles, Paper, SimpleGrid } from '@mantine/core'
import { EditorWrapper } from '../editors/EditorWrapper'
import NavLayout from '../layouts/NavLayout'

const useStyles = createStyles((theme) => ({
  mainpaper: {
      width: "100%"
  },
}));


export function Home() {
  const { classes } = useStyles();
  return (
    <NavLayout>
        <Paper p="sm" className={classes.mainpaper}>
          <SimpleGrid cols={1}>
            <EditorWrapper />
          </SimpleGrid>
        </Paper>
    </NavLayout>
  )
}