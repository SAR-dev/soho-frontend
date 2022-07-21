import { useState } from "react";
import { Paper, Button, Input, Badge, Center, createStyles, Text } from "@mantine/core";
import { Tag, X } from "tabler-icons-react";
import { createChannel, parseErrors } from "../../../helpers";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useNotifications } from "@mantine/notifications";
import { EmojiPopover } from "@editors/EmojiPopover";

const useStyles = createStyles((theme) => ({}));

export function ChannelCreateForm({ setOpened }: { setOpened: any }) {
    const { classes, cx } = useStyles();
    const { author } = useParams<"author">();

    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const [loading, setLoading] = useState(false);
    const [channelName, setChannelName] = useState("");

    const submit = () => {
        const username = author || "";
        setLoading(true);
        const data = {
            name: channelName,
        };
        createChannel({ username, data }).then((res) => {
            if (res.error) {
                notifications.showNotification({
                    title: "Error creating channel",
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
                <Input
                    placeholder="Folder Name"
                    rightSectionWidth={70}
                    styles={{ rightSection: { pointerEvents: "none" } }}
                    rightSection={
                        <Badge color="blue" variant="filled">
                            new
                        </Badge>
                    }
                    value={channelName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setChannelName(e.target.value)
                    }
                    size="xs"
                />

            </Center>
            <Button fullWidth mt="xl" onClick={submit} loading={loading}>
                Create
            </Button>
        </Paper>
    );
}
