import { Box, Paper, SimpleGrid } from '@mantine/core'
import { EditorWrapper } from '../editors/EditorWrapper'
import NavLayout from '../layouts/NavLayout'

export function Home() {
  return (
    <NavLayout>
        <Paper p="md">
          <SimpleGrid cols={1}>
            <EditorWrapper />
          </SimpleGrid>
        </Paper>
    </NavLayout>
  )
}