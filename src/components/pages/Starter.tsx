import { createStyles, Paper, Text, Stack } from '@mantine/core';
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { getLoggedInUser, getTokenFromLocal } from '../../helpers';
import { useNavigate } from "react-router-dom";
import useStore from '../../store';
import { getAuth, signOut } from 'firebase/auth';
import { GoogleLoginAlt } from '@reusable/nav/GoogleLoginAlt';
import { FaYoutube } from 'react-icons/fa';

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
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: 50
    },
    flex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));


export function Starter() {
    const { classes, cx } = useStyles();
    const { setToken, token } = useStore()

    const [hasToken, setHasToken] = useState(false)
    const navigate = useNavigate();

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>([token], getLoggedInUser, {
        enabled: token !== null || hasToken,
        onSuccess: (data) => {
            navigate(`/${data.username}/`);
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
        <Paper className={classes.mainpaper} style={{ backgroundColor: "#fff", position: "relative" }}>
            <div>
                <div className={classes.flex}>
                    <Text style={{ fontSize: 35 }} weight={700} mr={10} color="#000">GENERATING PASSIVE INCOME FOR</Text>
                    <FaYoutube style={{ marginRight: 10 }} size={35} color="#000" />
                    <Text style={{ fontSize: 35 }} weight={700} color="#000">CREATORS</Text>
                </div>
            </div>
            <Stack align="center" style={{position: "absolute", top: "65vh"}}>
                    <GoogleLoginAlt setToken={setToken} />
                </Stack>
        </Paper>
    )
}