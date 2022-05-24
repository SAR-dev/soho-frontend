import { useState } from 'react';
import { Modal, Button, Stack } from '@mantine/core';
import { Calendar, TimeInput } from '@mantine/dates';
import { Clock } from 'tabler-icons-react';
import dayjs from 'dayjs';

export function CalenderModal({ opened, setOpened, date, setDate }: { opened: boolean, setOpened: (params: boolean) => void, date: Date | null, setDate: (params: any) => void }) {
    const [value, setValue] = useState<Date | null>(null);
    const submit = () => {
        setDate(value)
        setOpened(false)
    }

    const setTime = (time: Date) => {
        value?.setMinutes(dayjs(time).minute())
        value?.setHours(dayjs(time).hour())
    }
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Select Date"
        >
            <Stack spacing="md">
                <Calendar value={value} onChange={setValue} style={{ margin: "auto" }} />
                <TimeInput
                    defaultValue={date}
                    icon={<Clock size={16} />}
                    value={value}
                    onChange={e => setTime(e)}
                />
                <Button onClick={submit} size="xs" fullWidth>Submit</Button>
            </Stack>
        </Modal>
    );
}