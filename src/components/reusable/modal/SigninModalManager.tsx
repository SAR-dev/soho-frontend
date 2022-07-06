import { ContextModalProps } from '@mantine/modals';
import { Button, Group } from '@mantine/core';
import useStore from 'src/store';
import { GoogleLogin } from '@reusable/nav/GoogleLogin';
import { TwitterLogin } from '@reusable/nav/TwitterLogin';

export const SigninModalManager = ({ context, id }: ContextModalProps) => {
    const { setToken, token } = useStore()

    return (
        <>
            <Group>
                <GoogleLogin setToken={setToken} />
                <TwitterLogin setToken={setToken} />
            </Group>
            <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
                I'll Sign in Later
            </Button>
        </>
    )
};