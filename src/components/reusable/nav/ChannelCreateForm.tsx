import { useState } from 'react';
import { Paper, Button, Input, Badge, SegmentedControl, Select } from '@mantine/core';
import { Tag, GitBranch, X } from 'tabler-icons-react';
import { createChannel } from '../../../helpers';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useNotifications } from '@mantine/notifications';

export function ChannelCreateForm({ setOpened }: { setOpened: any }) {
    const queryClient = useQueryClient()
    const notifications = useNotifications();

    const { cName } = useParams<"cName">();

    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('channel');
    const [channelName, setChannelName] = useState("")

    const [parentChannel, setParentChannel] = useState("")
    const [subChannelName, setSubChannelName] = useState("")

    const submit = () => {
        const username = cName || ""
        if (value === "channel") {
            setLoading(true)
            const data = {
                name: channelName
            }
            createChannel({ username, data }).then(res => {
                console.log(res.error.response.status)
                if (res.error) {
                    notifications.showNotification({
                        title: `Error ${res.error.response.status}`,
                        message: res.error.response.data.detail,
                        color: 'red',
                        icon: <X size={18} />
                    })
                    setLoading(false)
                } else {
                    setLoading(false)
                    queryClient.invalidateQueries(['channels', cName])
                    setOpened(false)
                }
            })
        }
        if (value === "subchannel") {
            setLoading(true)
            const data = {
                name: subChannelName
            }
        }
    }
    return (
        <Paper radius="md">
            <SegmentedControl
                value={value}
                onChange={setValue}
                data={[
                    { label: 'Channel', value: 'channel' },
                    { label: 'Sub-Channel', value: 'subchannel' },
                ]}
            />
            {value === "channel" && (
                <Input
                    icon={<Tag size={16} />}
                    placeholder="Your Channel Name"
                    rightSectionWidth={70}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    rightSection={
                        <Badge color="blue" variant="filled">
                            new
                        </Badge>
                    }
                    mt="md"
                    value={channelName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChannelName(e.target.value)}
                />
            )}
            {value === "subchannel" && (
                <>
                    <Select
                        icon={<Tag size={16} />}
                        placeholder="Select parent Channel"
                        data={[
                            { value: 'react', label: 'React' },
                            { value: 'ng', label: 'Angular' },
                            { value: 'svelte', label: 'Svelte' },
                            { value: 'vue', label: 'Vue' },
                        ]}
                        mt="md"
                    />
                    <Input
                        icon={<GitBranch size={16} />}
                        placeholder="Your Sub-Channel Name"
                        rightSectionWidth={70}
                        styles={{ rightSection: { pointerEvents: 'none' } }}
                        rightSection={
                            <Badge color="blue" variant="filled">
                                new
                            </Badge>
                        }
                        mt="md"
                        value={subChannelName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubChannelName(e.target.value)}

                    />
                </>
            )}
            <Button fullWidth mt="xl" onClick={submit} loading={loading}>
                Submit
            </Button>
        </Paper>
    );
}