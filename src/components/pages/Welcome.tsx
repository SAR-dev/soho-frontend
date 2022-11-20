import { createStyles, Paper, Text, Button } from '@mantine/core';
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { getLoggedInUser, getTokenFromLocal } from '../../helpers';
import { useNavigate } from "react-router-dom";
import useStore from '../../store';
import { getAuth, signOut } from 'firebase/auth';
import { GoogleLoginAlt } from '@reusable/nav/GoogleLoginAlt';

interface DataParam {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    username: string
}

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


export function Welcome() {
    const { classes, cx } = useStyles();
    const { setToken, token } = useStore()

    const [hasToken, setHasToken] = useState(false)
    const navigate = useNavigate();

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>([token], getLoggedInUser, {
        enabled: token !== null || hasToken,
        onSuccess: (data) => {
            navigate(`/c/${data.username}/`);
        },
        onError: () => {
            const auth = getAuth();
            signOut(auth)
        },
        retry: 1
    })

    useEffect(() => {
        const t = getTokenFromLocal();
        if (t) {
            setHasToken(true)
        }
    }, [])

    return (
        <Paper className={classes.mainpaper} style={{ backgroundImage: `url('https://i.ibb.co/1qb11Ff/image-1.jpg')` }}>
            <div>
                <Text className={classes.soho}>SOHO</Text>
                <Text className={classes.escape}>ESCAPE <br />BURNOUT</Text>
                <Text className={classes.discussion}>Kickstart your discussion community to escape the rat race of competition. Build genuine engagement and keep your cash flowing with monetization.</Text>
                {(isLoading || isFetching) ? (
                    <Button loading size="xl" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>READY SET GO</Button>

                ) : (
                    <GoogleLoginAlt setToken={setToken} />
                )}
            </div>
        </Paper>
    )
}