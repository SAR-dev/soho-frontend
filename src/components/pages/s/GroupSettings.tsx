import { CommunityUpdateInterface, MeUpdateInterface } from "@interfaces/api";
import { CommunityDataParam } from "@interfaces/community";
import { Avatar, Button, createStyles, Loader, Stack, Text, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { ErrorMessage } from "@reusable/ErrorMessage";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getCommunity, getLoggedInUser, getUpdateCommunity, parseErrors, toBase64, updateCommunity, updateLoggedInUser } from "src/helpers";
import useStore from "src/store";
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

interface DataParam {
    data: CommunityUpdateInterface
}


export function GroupSettings() {
    const { classes, cx } = useStyles();
    const { author } = useParams<"author">();
    const fileRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const [members_name, set_members_name] = useState("")
    const [slogan, set_slogan] = useState("")
    const [token, set_token] = useState("")


    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['update-community', author], () => getUpdateCommunity({ username: author }), {
        onSuccess: res => {
            set_members_name(res.data.members_name)
            set_slogan(res.data.slogan)
            set_token(res.data.token)
        }
    })

    const submit = () => {
        setLoading(true)
        setErrors([])

        const updatedData: CommunityUpdateInterface = {
            members_name, slogan, token
        }

        updateCommunity({ username: author, data: updatedData }).then(res => {
            if (res.error) {
                setErrors(parseErrors(res.error))
                setLoading(false)
            } else {
                notifications.showNotification({
                    title: "Updated",
                    message: "Community data has been updated.",
                    color: "teal",
                    icon: <Check size={18} />,
                    autoClose: 5000,
                });
                setLoading(false)
                queryClient.invalidateQueries(['update-community', author])
                queryClient.invalidateQueries(['community', author])
            }
        })
    }

    if (isLoading) return (<Loader color="green" variant="bars" />)

    return (
        <div>
            <Stack className={classes.w300}>
                <TextInput
                    placeholder="Members' name"
                    label="Members' name"
                    className="thick-border"
                    value={members_name}
                    onChange={e => set_members_name(e.target.value)}
                />
                <TextInput
                    placeholder="Slogan"
                    label="Slogan"
                    className="thick-border"
                    value={slogan}
                    onChange={e => set_slogan(e.target.value)}
                />
                <TextInput
                    placeholder="Joining Code"
                    label="Joining Code"
                    className="thick-border"
                    value={token}
                    onChange={e => set_token(e.target.value.toUpperCase())}
                />
                <ErrorMessage errors={errors} />

                <Button onClick={() => submit()} mt="sm" loading={loading}>Update</Button>
            </Stack>
        </div>
    )
}