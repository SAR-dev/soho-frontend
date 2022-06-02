import { useState } from "react";
import {
    Paper,
    Button,
    Input,
    Badge,
    SegmentedControl,
    Select,
    ColorPicker,
    Text,
} from "@mantine/core";
import { Tag, GitBranch, X } from "tabler-icons-react";
import { createChannel } from "../../../helpers";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useNotifications } from "@mantine/notifications";

export function ChannelCreateForm({ setOpened }: { setOpened: any }) {
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const { cName } = useParams<"cName">();

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("channel");
    const [channelName, setChannelName] = useState("");
    const [color, setColor] = useState("#4DABF7");

    const [parentChannel, setParentChannel] = useState("");
    const [subChannelName, setSubChannelName] = useState("");

    const submit = () => {
        const username = cName || "";
        if (value === "channel") {
            setLoading(true);
            const data = {
                name: channelName,
                color: color
            };
            createChannel({ username, data }).then((res) => {
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
                    queryClient.invalidateQueries(["channels", cName]);
                    setOpened(false);
                }
            });
        }
        if (value === "subchannel") {
            setLoading(true);
            const data = {
                name: subChannelName,
            };
        }
    };
    return (
        <Paper radius="md">
            <SegmentedControl
                value={value}
                onChange={setValue}
                data={[
                    { label: "Channel", value: "channel" },
                    { label: "Sub-Channel", value: "subchannel" },
                ]}
            />
            {value === "channel" && (
                <>
                    <Input
                        icon={<Tag size={16} />}
                        placeholder="Your Channel Name"
                        rightSectionWidth={70}
                        styles={{ rightSection: { pointerEvents: "none" } }}
                        rightSection={
                            <Badge color="blue" variant="filled">
                                new
                            </Badge>
                        }
                        my="md"
                        value={channelName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setChannelName(e.target.value)
                        }
                    />
                    <Text size="xs" color="dimmed" mb="xs">Pick a color</Text>
                    <ColorPicker
                        format="hex"
                        fullWidth
                        swatches={[
                            "#fa5252",
                            "#e64980",
                            "#be4bdb",
                            "#7950f2",
                            "#4c6ef5",
                            "#228be6",
                            "#15aabf",
                            "#12b886",
                            "#40c057",
                            "#fab005",
                        ]}
                        onChange={setColor}
                    />
                </>
            )}
            {value === "subchannel" && (
                <>
                    <Select
                        icon={<Tag size={16} />}
                        placeholder="Select parent Channel"
                        data={[
                            { value: "react", label: "React" },
                            { value: "ng", label: "Angular" },
                            { value: "svelte", label: "Svelte" },
                            { value: "vue", label: "Vue" },
                        ]}
                        mt="md"
                    />
                    <Input
                        icon={<GitBranch size={16} />}
                        placeholder="Your Sub-Channel Name"
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
                </>
            )}
            <Button fullWidth mt="xl" onClick={submit} loading={loading}>
                Submit
            </Button>
        </Paper>
    );
}
