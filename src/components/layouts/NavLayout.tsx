import { ReactNode } from 'react'
import { Paper, ScrollArea, createStyles, SimpleGrid } from '@mantine/core'
import DoubleNav from '../reusable/nav/DoubleNav'
import { HeaderMenu } from '../reusable/nav/HeaderMenu'
import { GoalCard } from '../reusable/GoalCard'

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
    },
    wrapper: {
        display: "flex"
    },
    cards: {
        width: 350,
        flexShrink: 0,
        paddingTop: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
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
                    <div className={classes.wrapper}>
                        {children}
                        <div className={classes.cards}>
                            <SimpleGrid cols={1}>
                                <GoalCard />
                            </SimpleGrid>
                        </div>
                    </div>
                </ScrollArea>
            </Paper>
        </Paper>
    )
}

export default NavLayout