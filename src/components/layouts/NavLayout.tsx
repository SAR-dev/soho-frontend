import { ReactNode } from 'react'
import { Paper, ScrollArea, createStyles } from '@mantine/core'
import DoubleNav from '../DoubleNav'
import { HeaderMenu } from '../HeaderMenu'

const NavHeight = 50

const useStyles = createStyles((theme) => ({
    mainpaper: {
        height: "100vh",
        display: "flex",
        borderRadius: 0
    },
    subpaper: {
        height: "100vh",
        width: "100%"
    },
    mainBody: {
        height: `calc(100vh - ${NavHeight}px)`
    }
}));

function NavLayout({ children }: { children: ReactNode }) {
    const { classes } = useStyles();
    return (
        <Paper className={classes.mainpaper}>
            <DoubleNav />
            <Paper className={classes.subpaper}>
                <HeaderMenu NavHeight={NavHeight} />
                <ScrollArea className={classes.mainBody}>
                    {children}
                </ScrollArea>
            </Paper>
        </Paper>
    )
}

export default NavLayout