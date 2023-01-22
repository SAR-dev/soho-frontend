import { useState } from "react";
import { Paper, Button, Input, Center, Text, Group, Alert } from "@mantine/core";
import { GitBranch, X } from "tabler-icons-react";
import { deleteSubChannel, parseErrors, updateSubChannel } from "../../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useNotifications } from "@mantine/notifications";
import { EmojiPopover } from "@editors/EmojiPopover";
import { getHotkeyHandler } from "@mantine/hooks";

export function SubChannelUpdateForm({ setOpened, name, icon, slug }: { setOpened: (params: boolean) => void, name: string, icon: string, slug: string }) {
    const { author } = useParams<"author">();
    const navigate = useNavigate()

    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const [loading, setLoading] = useState(false);
    const [subChannelName, setSubChannelName] = useState(name);
    const [emoji, setEmoji] = useState(icon)
    const [confirmation, setConfirmation] = useState(false)

    const insertText = (text: string) => {
        setEmoji(text)
    };

    const submit = () => {
        const username = author || "";
        setLoading(true);
        const data = {
            name: subChannelName,
            emoji: emoji
        };
        updateSubChannel({ username, sub_category: slug, data }).then((res) => {
            if (res.error) {
                notifications.showNotification({
                    title: `Error updating SOHO`,
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
                setLoading(false);
            } else {
                setLoading(false);
                queryClient.invalidateQueries(["channels", author]);
                setOpened(false);
            }
        });
    };

    const remove = () => {
        const username = author || "";
        setLoading(true);
        deleteSubChannel({ username, sub_category: slug }).then((res) => {
            if (res.error) {
                notifications.showNotification({
                    title: "Error deleting SOHO",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
                setLoading(false);
            } else {
                setLoading(false);
                queryClient.invalidateQueries(["channels", author]);
                navigate(-1);
                setOpened(false);
            }
        });
    };

    return (
        <Paper radius="md">
            {!confirmation ? (<>
                <Center my="md">
                    <EmojiPopover insertText={insertText} />
                    <Input
                        icon={emoji.length === 0 ? <GitBranch size={16} /> : <Text>{emoji}</Text>}
                        placeholder="Your Soho Name"
                        rightSectionWidth={70}
                        styles={{ rightSection: { pointerEvents: "none" } }}
                        // rightSection={
                        //     <Badge color="blue" variant="filled">
                        //         update
                        //     </Badge>
                        // }
                        value={subChannelName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSubChannelName(e.target.value)
                        }
                        size="xs"
                        ml="sm"
                        onKeyDown={getHotkeyHandler([
                            ['Enter', submit],
                        ])}
                    />
                </Center>
                <Group grow mt="xl" >
                    <Button color="red" onClick={() => setConfirmation(true)} loading={loading}>
                        Delete
                    </Button>
                    <Button onClick={submit} loading={loading}>
                        Update
                    </Button>
                </Group>
            </>) : (
                <Alert color="red" style={{ maxWidth: 400 }}>
                    <Text size="sm">Are you sure ??? Read Carefully</Text>
                    <Text size="sm" mt="sm">This  will delete all the posts in this SOHO. You can either change the name of your SOHO or continue deleteing SOHO with its posts.</Text>
                    <Group grow mt="xl" >
                    <Button color="red" onClick={remove} loading={loading}>
                        Continue Deleting
                    </Button>
                    <Button color="dark" onClick={() => setConfirmation(false)} loading={loading}>
                        Return
                    </Button>
                </Group>
                </Alert>
            )}
        </Paper>
    );
}
