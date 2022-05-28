import { Alert, createStyles, Drawer, ScrollArea, Stack } from '@mantine/core';
import { AiFillLike } from 'react-icons/ai';

interface Props {
    opened: boolean
    setOpened: (params: boolean) => void;
}

const useStyles = createStyles((theme) => ({
    notifilert: {
        '& .mantine-Alert-icon': {
            marginRight: 8
        },
        '& .mantine-Alert-title': {
            marginBottom: 0,
            fontWeight: 400
        }
    }
}));

export function NotificationDrawer({ opened, setOpened }: Props) {
    const { classes, cx } = useStyles();

    return (
        <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title="Notifications"
            padding="xl"
            size="xl"
            position="right"
        >
            <ScrollArea style={{ height: '100vh' }}>
            <Stack>
                {[...Array(10)].map((el, i) =>
                    <Alert icon={<AiFillLike size={16} />} title="Sayed Rafi" color="gray" className={classes.notifilert} key={i}>
                        You logged into Rakuten Cash Back on May 27, 2022, 5:26 PM. Not you? You can remove the app.
                    </Alert>
                )}
            </Stack>
            </ScrollArea>
        </Drawer>
    )
}
