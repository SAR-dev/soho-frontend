import { createStyles, TypographyStylesProvider, Anchor } from "@mantine/core";
import { Link, useParams, useSearchParams } from "react-router-dom";
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

const useStyles = createStyles((theme, _params, getRef) => ({
  typography: {
    fontSize: theme.fontSizes.sm,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
}));

export function HtmlRenderer({ body, id }: { body: string, id: number }) {
  const { author } = useParams<"author">();
  const [searchParams, setSearchParams] = useSearchParams();

  const { classes } = useStyles();
  return (
    <TypographyStylesProvider className={classes.typography}>
      {searchParams.get("details") ? (
        <div dangerouslySetInnerHTML={{ __html: body }} />
      ) : (
        <>
          <HTMLEllipsis
            unsafeHTML={body}
            maxLine={10}
            ellipsisHTML={'...'}
            basedOn='letters'
          />
          <Anchor
            component={Link}
            to={`/c/${author}/p/${id}?details=true`}
            className={classes.typography}
          >
            Continue reading...
          </Anchor>
        </>
      )}
    </TypographyStylesProvider>
  );
}
