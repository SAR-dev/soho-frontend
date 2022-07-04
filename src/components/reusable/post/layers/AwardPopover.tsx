import { AvailableAward } from '@interfaces/post';
import { Badge, Button, createStyles, Popover, Stack, Text } from '@mantine/core';
import { useState } from 'react'
import SVG, { Props as SVGProps } from "react-inlinesvg";
import { UserCircle } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => ({
    selectedImage: {
        objectFit: 'contain',
        height: 12
    },
    badge: {
        width: 50,
        margin: "auto"
    },
    popImage: {
        objectFit: 'contain',
        height: 80
    }
}));

export function AwardPopover({ award, count }: { award: AvailableAward, count: number }) {
    const { classes, cx } = useStyles();
    const [opened, setOpened] = useState(false);

    return (
        <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
            placement="center"
            withArrow
            trapFocus={false}
            closeOnEscape={false}
            transition="pop-top-left"
            width={260}
            styles={{ body: { pointerEvents: 'none' } }}
            target={
                <Button
                    styles={(theme) => ({
                        root: {
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[6]
                                    : theme.colors.gray[2],
                        },

                        leftIcon: {
                            marginRight: 5,
                        },
                    })}
                    size="xs"
                    compact
                    leftIcon={<SVG className={classes.selectedImage} src={award.logo} preProcessor={(code) => code?.replace(/(height=".*?")|(width=".*?")/g, '')} />}
                    onClick={() => setOpened(true)}
                >
                    {count}
                </Button>
            }
        >
            <Stack spacing="xs" mb="xs">
                <SVG className={classes.popImage} src={award.logo} preProcessor={(code) => code?.replace(/(height=".*?")|(width=".*?")/g, '')} />
                <Stack spacing={5}>
                    <Text align="center" weight={700} color="white">{award.name}</Text>
                    <Stack>
                        <Badge radius="xs" className={classes.badge}>$ {' '}{`${award.price}`}</Badge>
                    </Stack>
                </Stack>
                <Text color="dimmed" size="xs" align="center">{award.description}</Text>
            </Stack>
        </Popover>
    )
}