import { useState } from "react";
import {
    Paper,
    Button,
    Input,
    Badge,
    SegmentedControl,
    Select,
    Center,
    TextInput,
    createStyles,
    Text,
} from "@mantine/core";
import { Tag, GitBranch, X } from "tabler-icons-react";
import { createChannel, createSubChannel, getChannels, parseErrors } from "../../../helpers";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useNotifications } from "@mantine/notifications";
import { EmojiPopover } from "@editors/EmojiPopover";

const useStyles = createStyles((theme) => ({
    wFull: {
        width: "100%"
    },
    flex: {
        display: 'flex'
    }
}));

interface DataParam {
    data: {
        count: number;
        next: null;
        previous: null;
        results: Result[];
    }
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

export function ChannelCreateForm({ setOpened }: { setOpened: any }) {
    const { classes, cx } = useStyles();
    const { author } = useParams<"author">();
    const [parentChannels, setParentChannels] = useState<SelectModel[]>([])
    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['channels', author], () => getChannels({ username: author }), {
        onSuccess: res => {
            const t_res = res.data.results.map(el => {
                return { label: el.name, value: el.slug }
            })
            setParentChannels([...t_res])
        }
    })

    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("channel");
    const [channelName, setChannelName] = useState("");
    const [emoji, setEmoji] = useState("")

    const [parentChannel, setParentChannel] = useState<any | null>("");
    const [subChannelName, setSubChannelName] = useState("");

    const insertText = (text: string) => {
        setEmoji(text)
    };

    const submit = () => {
        const username = author || "";
        if (value === "channel") {
            setLoading(true);
            const data = {
                name: channelName,
                emoji: emoji
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
                <Center my="md">
                    <EmojiPopover insertText={insertText} />
                    <Input
                        icon={emoji.length === 0 ? <Tag size={16} /> : <Text>{emoji}</Text>}
                        placeholder="Your Channel Name"
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
                        ml="sm"
                    />

                </Center>
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
