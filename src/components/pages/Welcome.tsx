import WelcomeImage from "@images/welcome.jpg";

import { createStyles, Paper, Text, Button } from '@mantine/core';
import { CommunityDataParam } from '@interfaces/community';

const useStyles = createStyles((theme) => ({
    mainpaper: {
        height: "100vh",
        display: "flex",
        borderRadius: 0,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: 50
    },
    soho: {
        fontSize: 45,
        fontWeight: 900,
        color: "#fff"
    },
    escape: {
        fontSize: 80,
        fontWeight: 900,
        color: "#fff",
        lineHeight: 1.1,
        marginTop: 20,
        marginBottom: 40
    },
    discussion: {
        width: 800,
        color: "#fff",
        fontSize: 25,
        marginBottom: 40
    }
}));

interface DataParam {
    data: CommunityDataParam
}

export function Welcome() {
    const { classes, cx } = useStyles();
    
    return (
        <Paper className={classes.mainpaper} style={{ backgroundImage: `url('https://i.ibb.co/1qb11Ff/image-1.jpg')` }}>

            <div>
                <Text className={classes.soho}>SOHO</Text>
                <Text className={classes.escape}>ESCAPE <br />BURNOUT</Text>
                <Text className={classes.discussion}>Kickstart your discussion community to escape the rat race of competition. Build genuine engagement and keep your cash flowing with monetization.</Text>
                <Button size="xl" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>READY SET GO</Button>
            </div>
        </Paper>
    )
}