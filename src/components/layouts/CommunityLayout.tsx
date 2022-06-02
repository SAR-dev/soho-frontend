import { createStyles, Paper } from "@mantine/core";
import NavLayout from "./NavLayout";
import { ReactNode } from "react";

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

export function CommunityLayout({ children }: { children: ReactNode }) {

  const { classes } = useStyles();

  return (
    <NavLayout>
      <Paper className={classes.mainpaper}>
        {children}
      </Paper>
    </NavLayout>
  );
}
