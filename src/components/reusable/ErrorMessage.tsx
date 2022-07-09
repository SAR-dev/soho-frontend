import { createStyles, List, Text } from '@mantine/core';
import { capitalizeFirstLetter } from 'src/helpers';
import { AlertCircle } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    errorHolder: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[2],
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors.yellow[1], 0.25)
            : theme.colors[theme.primaryColor][0],
    }
}));

export function ErrorMessage({ errors }: { errors: string[] }) {
    const { classes, cx } = useStyles();

    return (
        <>
            {errors.length !== 0 && (
                <List size="xs" mt="xs" className={classes.errorHolder} icon={
                    <AlertCircle size={18} color="yellow" />
                }>
                    <Text size="xs" weight={600} color="yellow" mb="xs">Fix these errors</Text>
                    {errors.map((e, i) => <List.Item key={i}><Text size="xs" weight={600} color="yellow">{capitalizeFirstLetter(e)}</Text></List.Item>)}
                </List>
            )}</>
    )
}