import { Button } from "@mantine/core";
import { Cookie, X } from 'tabler-icons-react';
import { useNotifications } from '@mantine/notifications';
import { auth } from "../../../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useModals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import {FcGoogle} from "react-icons/fc"

export function GoogleLoginAlt({ setToken }: { setToken: (token: string) => void }) {
    const notifications = useNotifications();
    const modals = useModals();
    const navigate = useNavigate();

    const signinWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                if (token) {
                    setToken(token)
                }
                notifications.showNotification({
                    title: "Cookie Usage",
                    message: "By continuing to use this website you accept our Cokkie Usage policy. Please understand we use cookie only for optimized performance",
                    color: "blue",
                    icon: <Cookie size={18} />,
                    autoClose: false
                });
                modals.closeAll()
                navigate(0)
            }).catch((error) => {
                notifications.showNotification({
                    title: `Error ${error.code}`,
                    message: error.message,
                    color: 'red',
                    icon: <X size={18} />
                })
            });
    }


    return (
        <Button size="lg" color="dark" onClick={() => signinWithGoogle()} leftIcon={<FcGoogle size={20} />}>
            Continue with Google
        </Button>
    );
}
