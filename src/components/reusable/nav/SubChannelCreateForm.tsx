import { useState } from "react";
import { Paper, Button, Input, Badge, Select, createStyles, Center, Text } from "@mantine/core";
import { Tag, GitBranch, X } from "tabler-icons-react";
import { createSubChannel, getChannels } from "../../../helpers";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useNotifications } from "@mantine/notifications";
import { EmojiPopover } from "@editors/EmojiPopover";

const useStyles = createStyles((theme) => ({}));

export function SubChannelCreateForm({ setOpened, channel }: { setOpened: (params: boolean) => void, channel: string }) {
    const { classes, cx } = useStyles();
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
                    title: `Error ${res.error.response.status}`,
                    message: res.error.response.data.detail,
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
                />
            </Center>
            <Button fullWidth mt="xl" onClick={submit} loading={loading}>
                Create
            </Button>
        </Paper>
    );
}
