import { createStyles, TypographyStylesProvider, Anchor } from "@mantine/core";
import { Link, useParams, useSearchParams } from "react-router-dom";
// import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import Truncate from 'react-truncate';
import { useState } from "react";

const useStyles = createStyles((theme, _params, getRef) => ({
  typography: {
    fontSize: theme.fontSizes.sm,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
    display: 'block'
  },
}));

export function HtmlRenderer({ body, id }: { body: string, id: number }) {
  const { author } = useParams<"author">();
  const [searchParams, setSearchParams] = useSearchParams();
  const [expanded, setExpanded] = useState(false)

  const { classes, cx } = useStyles();
  return (
    <TypographyStylesProvider className={classes.typography}>
      {searchParams.get("details") ? (
        <div dangerouslySetInnerHTML={{ __html: body }} />
      ) : (
        <>
          <Truncate lines={expanded ? 100 : 10} ellipsis={
            <Anchor
              className={classes.typography}
              onClick={() => setExpanded(true)}
            >
              Read More
            </Anchor>
          }>
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </Truncate>
        </>
      )}
    </TypographyStylesProvider>
  );
}
