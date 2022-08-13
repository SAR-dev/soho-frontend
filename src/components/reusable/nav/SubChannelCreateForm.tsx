import { useState } from "react";
import { Paper, Button, Input, Badge, createStyles, Center, Text } from "@mantine/core";
import { GitBranch, X } from "tabler-icons-react";
import { createSubChannel, parseErrors } from "../../../helpers";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useNotifications } from "@mantine/notifications";
import { EmojiPopover } from "@editors/EmojiPopover";
import { getHotkeyHandler } from "@mantine/hooks";


export function SubChannelCreateForm({ setOpened, channel }: { setOpened: (params: boolean) => void, channel: string }) {
    const { author } = useParams<"author">();

    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const [loading, setLoading] = useState(false);
    const [subChannelName, setSubChannelName] = useState("");
    const [emoji, setEmoji] = useState("")

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
        createSubChannel({ username, category: channel, data }).then((res) => {
            if (res.error) {
                notifications.showNotification({
                    title: `Error creating Soho`,
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
    return (
        <Paper radius="md">
            <Center my="md">
                <EmojiPopover insertText={insertText} />
                <Input
                    icon={emoji.length === 0 ? <GitBranch size={16} /> : <Text>{emoji}</Text>}
                    placeholder="Your Soho Name"
                    rightSectionWidth={70}
                    styles={{ rightSection: { pointerEvents: "none" } }}
                    rightSection={
                        <Badge color="blue" variant="filled">
                            new
                        </Badge>
                    }
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
            <Button fullWidth mt="xl" onClick={submit} loading={loading}>
                Create
            </Button>
        </Paper>
    );
}
