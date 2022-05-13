import { useState } from 'react';
import { Paper, Button, Input, Badge, SegmentedControl, Select } from '@mantine/core';
import { Tag, GitBranch } from 'tabler-icons-react';

export function ChannelCreateForm({ setOpened }: { setOpened: any }) {
    const [value, setValue] = useState('channel');
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
                    />
                </>
            )}
            <Button fullWidth mt="xl" onClick={() => setOpened(false)}>
                Submit
            </Button>
        </Paper>
    );
}