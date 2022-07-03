import React, { useState } from 'react';
import { createStyles, Card, Group, Switch, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    item: {
        '& + &': {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },
    },
    switch: {
        '& *': {
            cursor: 'pointer',
        },
    },
    title: {
        lineHeight: 1,
    },
}));

interface SwitchesCardProps {
    title: string;
    description: string;
    data: {
        title: string;
        description: string;
    }[];
    values: boolean[];
    handleValues: ({checked, index}: {checked: boolean, index: number}) => void
}

export function JoiningForm({ title, description, data, values, handleValues }: SwitchesCardProps) {
    const { classes } = useStyles();
    

    const items = data.map((item, i) => (
        <Group position="apart" className={classes.item} noWrap spacing="xl">
            <div>
                <Text>{item.title}</Text>
                <Text size="xs" color="dimmed">
                    {item.description}
                </Text>
            </div>
            <Switch checked={values[i]} onChange={(event) => handleValues({checked: event.currentTarget.checked, index: i})} className={classes.switch} size="lg" />
        </Group>
    ));

    return (
        <Card withBorder>
            <Text size="lg" className={classes.title} weight={500}>
                {title}
            </Text>
            <Text size="xs" color="dimmed" mt={3} mb="xl">
                {description}
            </Text>
            {items}
        </Card>
    );
}