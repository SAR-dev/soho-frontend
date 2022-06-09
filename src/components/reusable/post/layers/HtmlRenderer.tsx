import { createStyles, TypographyStylesProvider, Anchor } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { Element } from 'domhandler/lib/node';

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

  const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (domNode instanceof Element && domNode.attribs && domNode.attribs.name === 'link') {
        return <Anchor
          className={classes.typography}
          component={Link}
          to={`/c/${author}/p/${id}?details=true`}
        >
          Read More
        </Anchor>
      }
    }
  };

  const { classes, cx } = useStyles();
  return (
    <TypographyStylesProvider className={classes.typography}>
      {parse(body, options)}
    </TypographyStylesProvider>
  );
}
