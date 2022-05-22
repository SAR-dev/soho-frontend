import { Group, Text, Stack, Image } from '@mantine/core';

export function CommentAward() {

    return (
            <Stack spacing={8}>
                <Group spacing="xs">
                <Image
                            height={20}
                            width={20}
                            src="https://i.ibb.co/RPYRNKB/image.png"
                            radius={14}
                            withPlaceholder
                        />
                    <Text size="sm" color="dimmed">Sayed Ar Rafi awarded golden medal 2 hours ago.</Text>
                </Group>
            </Stack>
    )
}