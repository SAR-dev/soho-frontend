import { Center, Loader, Paper, Stack, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { getLoggedInUser, getTokenFromLocal } from '../../helpers';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '../reusable/nav/GoogleLogin';
import useStore from '../../store';
import { getAuth, signOut } from 'firebase/auth';

interface DataParam {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    username: string
}

export function Home() {
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
        <Paper radius={0} p={0}>
            <Center style={{ width: "100%", height: "100vh" }}>
                {(isLoading || isFetching)? (
                    <Stack align="center">
                        <Loader size="xl" />
                        <Text size='xl' weight={600}>Trying to Authenticate</Text>
                    </Stack>
                ) : (
                    <Stack align="center">
                        <GoogleLogin setToken={setToken} />
                    </Stack>
                )}
            </Center>
        </Paper>
    )
}