import { ReactNode, useLayoutEffect } from 'react'
import { Paper, ScrollArea, createStyles, SimpleGrid } from '@mantine/core'
import DoubleNav from '../reusable/nav/DoubleNav'
import { HeaderMenu } from '../reusable/nav/HeaderMenu'
import { TopClaps } from '../reusable/stats/TopClaps'
import { Moderators } from '../reusable/stats/Moderators'
import useStore from 'src/store'
import { useNavigate } from 'react-router-dom'

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
        flexShrink: 0,
        paddingTop: 3,
        paddingRight: theme.spacing.sm,
        paddingLeft: theme.spacing.sm,
    },
    sticky: {
        position: 'sticky',
        top: 3
    }
}));

export function SettingsLayout({ children }: { children: ReactNode }) {
    const { classes, cx } = useStyles();
    const { token } = useStore()
    const navigate = useNavigate();

    useLayoutEffect(() => {
      if(!token){
        navigate("/")
      }
    }, [])

    return (
        <Paper className={classes.mainpaper}>
            <Paper className={classes.subpaper}>
                <HeaderMenu NavHeight={NavHeight} />
                <ScrollArea className={classes.mainBody}>
                    <div className={classes.wrapper}>
                        {children}
                    </div>
                </ScrollArea>
            </Paper>
        </Paper>
    )
}