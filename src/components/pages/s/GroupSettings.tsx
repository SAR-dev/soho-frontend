import { CommunityUpdateInterface } from "@interfaces/api";
import { CommunityUpdateDataParam } from "@interfaces/community";
import { Button, Center, createStyles, Image, Loader, Stack, Text, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { ErrorMessage } from "@reusable/ErrorMessage";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getUpdateCommunity, parseErrors, toBase64, updateCommunity } from "src/helpers";
import { Check, Photo } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
    },
    w300: {
        width: 300
    },
    uploader: {
        cursor: "pointer",
        borderRadius: theme.radius.sm
    },
    placeholder: {
        height: 200, 
        width: "100%", 
        display: "flex", 
        justifyContent: "center"
    }
}));

interface DataParam {
    data: CommunityUpdateDataParam
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
    const [cover, setCover] = useState<File>()
    const [cover_src, set_cover_src] = useState("")

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['update-community', author], () => getUpdateCommunity({ username: author }), {
        onSuccess: res => {
            set_members_name(res.data.members_name)
            set_slogan(res.data.slogan)
            set_token(res.data.token)
            if (cover_src.length === 0) { set_cover_src(res.data.cover) }
        }
    })

    useEffect(() => {
        (async () => {
            if (cover) {
                const url = await toBase64(cover);
                if (typeof url === "string") set_cover_src(url);
            }
        })();
    }, [cover])

    const handleChange = async (e: any) => {
        setCover(e.target.files[0])
    };

    const submit = () => {
        setLoading(true)
        setErrors([])

        const updatedData: CommunityUpdateInterface = {
            members_name, slogan, token
        }

        if (cover) {
            updatedData.cover = cover
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
                <div>
                    <Image
                        height={200}
                        width="100%"
                        fit="cover"
                        className={classes.uploader} alt="With custom placeholder"
                        withPlaceholder
                        placeholder={<div className={classes.placeholder}><Center><Photo size={80} /></Center></div>} 
                        onClick={() => fileRef?.current?.click()} 
                        src={cover_src} 
                    />
                    <Text color="dimmed" size="xs">Click cover to update</Text>
                </div>
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