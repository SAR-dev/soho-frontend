import { useState } from "react";
import { Paper, Button, Input, Badge, Select, createStyles } from "@mantine/core";
import { Tag, GitBranch, X } from "tabler-icons-react";
import { createSubChannel, getChannels } from "../../../helpers";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useNotifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({}));

export function SubChannelCreateForm({ setOpened, channel }: { setOpened: (params: boolean) => void, channel: string }) {
    const { classes, cx } = useStyles();
    const { author } = useParams<"author">();

    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const [loading, setLoading] = useState(false);
    const [subChannelName, setSubChannelName] = useState("");

    const submit = () => {
        const username = author || "";
        setLoading(true);
        const data = {
            name: subChannelName,
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
            <Input
                icon={<GitBranch size={16} />}
                placeholder="Your Soho Name"
                rightSectionWidth={70}
                styles={{ rightSection: { pointerEvents: "none" } }}
                rightSection={
                    <Badge color="blue" variant="filled">
                        new
                    </Badge>
                }
                mt="md"
                value={subChannelName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSubChannelName(e.target.value)
                }
            />
            <Button fullWidth mt="xl" onClick={submit} loading={loading}>
                Create
            </Button>
        </Paper>
    );
}
