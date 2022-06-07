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
    ColorInput,
    ActionIcon,
} from "@mantine/core";
import { Tag, GitBranch, X, Refresh } from "tabler-icons-react";
import { createChannel, createSubChannel, getChannels } from "../../../helpers";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useNotifications } from "@mantine/notifications";

interface DataParam {
    count: number;
    next: null;
    previous: null;
    results: Result[];
}

interface Result {
    id: number;
    color: string;
    name: string;
    slug: string;
    about: null;
    sub_categories: SubCategory[];
}

interface SubCategory {
    id: number;
    name: string;
    slug: string;
}

interface SelectModel {
    label: string;
    value: string;
}

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export function ChannelCreateForm({ setOpened }: { setOpened: any }) {
    const { author } = useParams<"author">();
    const [parentChannels, setParentChannels] = useState<SelectModel[]>([])
    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['channels', author], () => getChannels(author), {
        onSuccess: data => {
            const res = data.results.map(el => {
                return { label: el.name, value: el.slug }
            })
            setParentChannels([...res])
        }
    })

    const queryClient = useQueryClient();
    const notifications = useNotifications();


    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("channel");
    const [channelName, setChannelName] = useState("");
    const [color, setColor] = useState("#4DABF7");

    const [parentChannel, setParentChannel] = useState<any | null>("");
    const [subChannelName, setSubChannelName] = useState("");

    const submit = () => {
        const username = author || "";
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
                    queryClient.invalidateQueries(["channels", author]);
                    setOpened(false);
                }
            });
        }
        if (value === "subchannel") {
            setLoading(true);
            const data = {
                name: subChannelName,
            };
            createSubChannel({ username, category: parentChannel, data }).then((res) => {
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
                    <ColorInput
                        placeholder="Pick color"
                        label="Pick a color"
                        value={color}
                        onChange={setColor}
                        rightSection={
                            <ActionIcon onClick={() => setColor(randomColor())}>
                                <Refresh size={16} />
                            </ActionIcon>
                        }
                    />
                </>
            )}
            {value === "subchannel" && (
                <>
                    <Select
                        icon={<Tag size={16} />}
                        placeholder="Select parent Channel"
                        searchable
                        data={parentChannels}
                        value={parentChannel}
                        onChange={e => setParentChannel(e)}
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
