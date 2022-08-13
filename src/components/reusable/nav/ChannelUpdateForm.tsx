import { useState } from "react";
import { Paper, Button, Input, Badge, Center, createStyles } from "@mantine/core";
import { X } from "tabler-icons-react";
import { createChannel, getChannels, parseErrors, updateChannel } from "../../../helpers";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useNotifications } from "@mantine/notifications";
import { getHotkeyHandler } from "@mantine/hooks";
import { Category } from "@interfaces/category";

interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: Category[];
    }
}
export function ChannelUpdateForm({ name, slug, setOpened }: { name: string, slug: string, setOpened: any }) {
    const { author } = useParams<"author">();


    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const [loading, setLoading] = useState(false);

    const [channelName, setChannelName] = useState(name);

    const submit = () => {
        const username = author || "";
        setLoading(true);
        const data = {
            name: channelName,
        };
        updateChannel({ username, category: slug, data }).then((res) => {
            if (res.error) {
                notifications.showNotification({
                    title: "Error updating folder",
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
                            update
                        </Badge>
                    }
                    value={channelName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setChannelName(e.target.value.toUpperCase())
                    }
                    size="xs"
                    onKeyDown={getHotkeyHandler([
                        ['Enter', submit],
                    ])}
                />

            </Center>
            <Button fullWidth mt="xl" onClick={submit} loading={loading}>
                Update
            </Button>
        </Paper>
    );
}
