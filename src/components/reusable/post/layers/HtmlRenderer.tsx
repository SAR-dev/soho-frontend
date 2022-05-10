import { createStyles, TypographyStylesProvider, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => ({
  typography: {
    fontSize: theme.fontSizes.sm,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
}));

export function HtmlRenderer({ body }: { body: string }) {
  const { classes } = useStyles();
  return (
    <TypographyStylesProvider className={classes.typography}>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Anchor
        component={Link}
        to="/react-router"
        className={classes.typography}
      >
        Continue reading...
      </Anchor>
    </TypographyStylesProvider>
  );
}
