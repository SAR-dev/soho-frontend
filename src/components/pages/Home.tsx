import { Box, createStyles, Paper, SimpleGrid } from '@mantine/core'
import { EditorWrapper } from '../editors/EditorWrapper'
import NavLayout from '../layouts/NavLayout'
import { DiscussionPostCard } from '../reusable/post/DiscussionPostCard';

const demoText = `
<p>This is example article from from <a href="https://css-tricks.com/your-team-is-not-them/">CSS-Tricks website</a> written by <a href="https://css-tricks.com/author/sdrasner/">Sarah Drasner</a>. It is used as an example to showcase real world styles of TypographyStylesProvider component, please read full article on <a href="https://css-tricks.com/your-team-is-not-them/">CSS-Tricks website</a>.</p>
<p>Let’s talk for a moment about how we talk about our teams. This might not seem like something that needs a whole article dedicated to it, but it’s actually quite crucial. The way that we refer to our teams sends signals: to stakeholders, to your peers, to the team itself, and even to ourselves. In addressing how we speak about our teams, we’ll also talk about accountability.</p>
<p>I have noticed shared similarities in those folks I consider good managers whose teams deliver well, and those who don’t. It starts with how they communicate about their teams.</p>
`

const useStyles = createStyles((theme) => ({
  mainpaper: {
    width: "100%",
  },
}));


export function Home() {
  const { classes } = useStyles();
  return (
    <NavLayout>
      <Paper p="sm" className={classes.mainpaper}>
        <SimpleGrid cols={1}>
          <EditorWrapper />
          <DiscussionPostCard
            postedAt='10 minutes ago'
            body={demoText}
            author={{ name: 'Jacob Warnhalter', image: 'https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png' }}
            temp='120'
          />
        </SimpleGrid>
      </Paper>
    </NavLayout>
  )
}