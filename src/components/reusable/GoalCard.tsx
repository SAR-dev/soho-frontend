import React from 'react';
import { createStyles, Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
    UserPlus,
    Discount2,
    Receipt2,
    Coin,
    ArrowUpRight,
    ArrowDownRight,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    value: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));

const icons = {
    user: UserPlus,
    discount: Discount2,
    receipt: Receipt2,
    coin: Coin,
};

const data = [
    { title: "Revenue", icon: "receipt", value: "13,456", diff: 34 },
    { title: "Profit", icon: "coin", value: "4,145", diff: -13 },
    { title: "Coupons usage", icon: "discount", value: "745", diff: 18 },
    { title: "New customers", icon: "user", value: "188", diff: -30 }
]

export function GoalCard() {
    const { classes } = useStyles();
    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group position="apart">
                    <Text size="xs" color="dimmed" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size={22} />
                </Group>

                <Group align="flex-end" spacing="xs" mt={25}>
                    <Text className={classes.value}>{stat.value}</Text>
                    <Text
                        color={stat.diff > 0 ? 'teal' : 'red'}
                        size="sm"
                        weight={500}
                        className={classes.diff}
                    >
                        <span>{stat.diff}%</span>
                        <DiffIcon size={16} />
                    </Text>
                </Group>

                <Text size="xs" color="dimmed" mt={7}>
                    Compared to previous month
                </Text>
            </Paper>
        );
    });
    return (
            <SimpleGrid
                cols={1}
            >
                {stats}
            </SimpleGrid>
    );
}