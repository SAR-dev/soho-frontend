import { ReactNode } from 'react'
import { Paper, createStyles } from '@mantine/core';
import { Helmet } from "react-helmet";
import favicon from "@favicon/favicon.ico";
import chrome192 from "@favicon/android-chrome-192x192.png";
import chrome512 from "@favicon/android-chrome-512x512.png";
import apple from "@favicon/apple-touch-icon.png";
import fav32 from "@favicon/favicon-32x32.png";
import fav16 from "@favicon/favicon-16x16.png";
import manifest from "@favicon/site.webmanifest";

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
        <>
            <Helmet>
                <title>SOHO</title>
                <link rel="icon" type="image/png" href={favicon} />
                <link rel="apple-touch-icon" sizes="180x180" href={apple} />
                <link rel="icon" type="image/png" sizes="32x32" href={fav32} />
                <link rel="icon" type="image/png" sizes="16x16" href={fav16} />
                <link rel="manifest" href={manifest}></link>
            </Helmet>

            <Paper className={classes.mainpaper}>
                {children}
            </Paper>
        </>
    )
}

export default BaseLayout