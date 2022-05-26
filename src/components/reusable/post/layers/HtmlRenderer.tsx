import { createStyles, TypographyStylesProvider, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import { useState } from "react";

const useStyles = createStyles((theme, _params, getRef) => ({
  typography: {
    fontSize: theme.fontSizes.sm,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
}));

export function HtmlRenderer({ body }: { body: string }) {
  const { classes } = useStyles();
  const [expanded, setExpanded] = useState(false)
  return (
    <TypographyStylesProvider className={classes.typography}>
      <HTMLEllipsis
        unsafeHTML={body}
        maxLine={expanded ? '20' : '8'}
        ellipsis='...'
        basedOn='letters'
      />
      {expanded ? (
        <Anchor
          component={Link}
          to="?post=1"
          className={classes.typography}
        >
          Continue reading...
        </Anchor>
      ) : (
        <Anchor
          onClick={() => setExpanded(true)}
          className={classes.typography}
        >
          Read more...
        </Anchor>
      )}
    </TypographyStylesProvider>
  );
}
