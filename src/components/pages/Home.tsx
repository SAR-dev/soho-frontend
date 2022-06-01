import { Center, Loader, Paper, Stack, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { getTokenFromLocal } from '../../helpers';
import { useNavigate } from "react-router-dom";

interface DataParam {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    username: string
}

export function Home() {
    const [hasToken, setHasToken] = useState(false)
    const navigate = useNavigate();
    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(`account/me/`, {
        enabled: hasToken,
        onSuccess: (data) => {
            navigate(`/c/${data.username}/`);
        },
        onError: () => {
            navigate("/404")
        }
    })

    useEffect(() => {
        const t = getTokenFromLocal();
        if (t) {
            setHasToken(true)
        } else {

        }
    }, [])

    return (
        <Paper radius={0} p={0}>
            <Center style={{ width: "100%", height: "100vh" }}>
                <Stack align="center">
                    <Loader size="xl" />
                    <Text size='xl' weight={600}>Trying to Authenticate</Text>
                </Stack>
            </Center>
        </Paper>
    )
}