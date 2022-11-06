import { MeUpdateInterface } from "@interfaces/api";
import { UserDataParam } from "@interfaces/user";
import { Avatar, Button, createStyles, Loader, Stack, Text, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { ErrorMessage } from "@reusable/ErrorMessage";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getLoggedInUser, parseErrors, toBase64, updateLoggedInUser } from "src/helpers";
import { Check } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
    },
    w300: {
        width: 300
    },
    uploader: {
        cursor: "pointer"
    }
}));

export function ProfileSettings() {
    const { classes, cx } = useStyles();
    const fileRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const [avatar, setAvatar] = useState<File>()
    const [avatar_src, set_avatar_src] = useState("")
    const [first_name, set_first_name] = useState("")
    const [last_name, set_last_name] = useState("")
    const [username, set_username] = useState("")

    const { status, data, error, isFetching, isLoading } = useQuery<UserDataParam, Error>("me", getLoggedInUser, {
        onSuccess: res => {
            set_first_name(res.first_name)
            set_last_name(res.last_name)
            set_username(res.username)
            if (avatar_src.length === 0) { set_avatar_src(res.avatar) }
        }
    })


    useEffect(() => {
        (async () => {
            if (avatar) {
                const url = await toBase64(avatar);
                if (typeof url === "string") set_avatar_src(url);
            }
        })();
    }, [avatar])

    const handleChange = async (e: any) => {
        setAvatar(e.target.files[0])
    };

    const submit = () => {
        setLoading(true)
        setErrors([])

        const updatedData: MeUpdateInterface = {
            first_name, last_name, username
        }

        if (avatar) {
            updatedData.avatar = avatar
        }

        updateLoggedInUser({ data: updatedData }).then(res => {
            if (res.error) {
                setErrors(parseErrors(res.error))
                setLoading(false)
            } else {
                notifications.showNotification({
                    title: "Updated",
                    message: "Your data has been updated.",
                    color: "teal",
                    icon: <Check size={18} />,
                    autoClose: 5000,
                });
                setLoading(false)
                const oldData1: any = queryClient.getQueryData<UserDataParam>(['me'])
                const newData1 = oldData1
                newData1.username = res.data.username
                newData1.first_name = res.data.first_name
                newData1.last_name = res.data.last_name
                newData1.avatar = res.data.avatar
                queryClient.setQueryData(['me'], { ...newData1 })

                const oldData2: any = queryClient.getQueryData<UserDataParam>(['community', res.data.username])
                const newData2 = oldData2
                newData2.username = res.data.username
                newData2.first_name = res.data.first_name
                newData2.last_name = res.data.last_name
                newData2.avatar = res.data.avatar
                queryClient.setQueryData(['community', res.data.username], { ...newData2 })
            }
        })
    }

    if (isLoading) return (<Loader color="green" variant="bars" />)

    return (
        <div>
            <Stack className={classes.w300}>
                <div>
                    <Avatar size="xl" className={classes.uploader} onClick={() => fileRef?.current?.click()} src={avatar_src} />
                    <Text color="dimmed" size="xs">Click avatar to update</Text>
                </div>
                <TextInput
                    placeholder="First name"
                    label="First name"
                    className="thick-border"
                    value={first_name}
                    onChange={e => set_first_name(e.target.value)}
                />
                <TextInput
                    placeholder="Last name"
                    label="Last name"
                    className="thick-border"
                    value={last_name}
                    onChange={e => set_last_name(e.target.value)}
                />
                <TextInput
                    placeholder="Username"
                    label="Username"
                    className="thick-border"
                    value={username}
                    onChange={e => set_username(e.target.value)}
                />
                <ErrorMessage errors={errors} />

                <Button onClick={() => submit()} mt="sm" loading={loading}>Update</Button>
            </Stack>
            <input
                ref={fileRef}
                onChange={handleChange}
                multiple
                type="file"
                accept="image/*"
                hidden
            />
        </div>
    )
}