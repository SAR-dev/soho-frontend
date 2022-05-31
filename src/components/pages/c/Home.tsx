import { createStyles, Paper, SimpleGrid } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { EditorCreator } from "../../editors/EditorCreator";
import { EditorWrapper } from "../../editors/EditorWrapper";
import NavLayout from "../../layouts/NavLayout";
import { AmaPostCard } from "../../reusable/post/AmaPostCard";
import { DiscussionPostCard } from "../../reusable/post/DiscussionPostCard";
import { PollPostCard } from "../../reusable/post/PollPostCard";
import { PostDetails } from "../../reusable/post/PostDetails";
import { useSearchParams } from 'react-router-dom';

const demoHtmlText = `
<p>This is example article from from <a href="https://css-tricks.com/your-team-is-not-them/">CSS-Tricks website</a> written by <a href="https://css-tricks.com/author/sdrasner/">Sarah Drasner</a>. It is used as an example to showcase real world styles of TypographyStylesProvider component, please read full article on <a href="https://css-tricks.com/your-team-is-not-them/">CSS-Tricks website</a>.</p>
<p>Let’s talk for a moment about how we talk about our teams. This might not seem like something that needs a whole article dedicated to it, but it’s actually quite crucial. The way that we refer to our teams sends signals: to stakeholders, to your peers, to the team itself, and even to ourselves. In addressing how we speak about our teams, we’ll also talk about accountability.</p>
<p>I have noticed shared similarities in those folks I consider good managers whose teams deliver well, and those who don’t. It starts with how they communicate about their teams.</p>
`;

const demoText = `The way that we refer to our teams sends signals: to stakeholders, to your peers, to the team itself, and even to ourselves. In addressing how we speak about our teams, we’ll also talk about accountability.`;

const useStyles = createStyles((theme) => ({
  mainpaper: {
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    paddingBottom: theme.spacing.xl,
  },
}));

export function Home() {
  const [searchParams] = useSearchParams();

  const { classes } = useStyles();
  const [clicked, toogle] = useBooleanToggle(false);

  return (
    <NavLayout>
      <Paper className={classes.mainpaper}>
        <SimpleGrid cols={1} spacing={3}>
          {searchParams.get('post') ? (
            <PostDetails postedAt="10 minutes ago"
              body={demoHtmlText}
              author={{
                name: "Jacob Warnhalter",
                image:
                  "https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png",
              }}
              temp="120" />
          ) : (
            <>

              {clicked ? <EditorWrapper toogle={toogle} /> : <EditorCreator toogle={toogle} />}
              <DiscussionPostCard
                postedAt="10 minutes ago"
                body={demoHtmlText}
                author={{
                  name: "Jacob Warnhalter",
                  image:
                    "https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png",
                }}
                temp="120"
              />
              <PollPostCard
                postedAt="10 minutes ago"
                body={demoHtmlText}
                author={{
                  name: "Jacob Warnhalter",
                  image:
                    "https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png",
                }}
                temp="120"
              />
              <AmaPostCard
                postedAt="10 minutes ago"
                body={demoText}
                author={{
                  name: "Jacob Warnhalter",
                  image:
                    "https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png",
                }}
                temp="120"
              />
            </>
          )}
        </SimpleGrid>
      </Paper>
    </NavLayout>
  );
}
