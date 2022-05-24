import { useState, useEffect } from 'react';
import { Modal, Button, Stack } from '@mantine/core';
import { Calendar, TimeInput } from '@mantine/dates';
import { Clock } from 'tabler-icons-react';
import dayjs from 'dayjs';

interface Props {
    opened: boolean;
    setOpened: (params: boolean) => void;
    datetime: Date | null;
    setDatetime: (params: any) => void
}

export function CalenderModal({ opened, setOpened, datetime, setDatetime }: Props) {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setDate(datetime)
        setTime(datetime)
    }, [datetime])


    const submit = () => {
        const d = date
        const m = dayjs(time).minute()
        const h = dayjs(time).hour()
        if (m && h) {
            d?.setMinutes(m)
            d?.setHours(h)
        }
        setDatetime(d)
        setOpened(false)
    }
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Select Date and Time"
        >
            <Stack spacing="md">
                <Calendar value={date} onChange={setDate} style={{ margin: "auto" }} />
                <TimeInput
                    defaultValue={datetime}
                    icon={<Clock size={16} />}
                    value={time}
                    onChange={setTime}
                />
                <Button onClick={submit} size="xs" fullWidth>Submit</Button>
            </Stack>
        </Modal>
    );
}