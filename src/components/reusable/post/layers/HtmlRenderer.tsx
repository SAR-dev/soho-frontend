import { createStyles, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { Element } from 'domhandler/lib/node';

const useStyles = createStyles((theme, _params, getRef) => ({
  typography: {
    fontSize: theme.fontSizes.sm,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
}));

export function HtmlRenderer({ body, id, author }: { body: string, id: number, author?: string }) {
  const { classes, cx } = useStyles();

  const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (domNode instanceof Element && domNode.attribs && domNode.attribs.name === 'link') {
        return <Anchor
          className={cx(classes.typography, "link")}
          component={Link}
          to={`/${author}/p/${id}?details=true`}
        >
          ...Read More
        </Anchor>
      }
    }
  };

  return (
    <div className={cx(classes.typography, "markdown-body-dark")}>
        {parse(body, options)}
    </div>
  );
}
