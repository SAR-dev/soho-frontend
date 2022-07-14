import { ReactNode } from 'react'
import { Paper, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    mainpaper: {
        height: "100vh",
        display: "flex",
        borderRadius: 0
    }
}));

function BaseLayout({ children }: { children: ReactNode }) {
    const { classes, cx } = useStyles();
    return (
        <Paper className={classes.mainpaper}>
            {children}
        </Paper>
    )
}

export default BaseLayout