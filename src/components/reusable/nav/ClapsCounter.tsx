import { Button, createStyles } from '@mantine/core'
import { ClapIcon } from '@reusable/ClapIcon'
import { useQuery } from 'react-query';
import { doubleDigit, getClapsCount } from 'src/helpers';
import CountUp from 'react-countup';

const useStyles = createStyles((theme) => ({
    link: {
        borderRadius: theme.radius.sm,
        width: 80,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[3],

        "&:hover": {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][1],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
        },
    },
}));

interface DataParam {
    data: {
        claps: number
    }
}

export function ClapsCounter() {
    const { classes } = useStyles();
    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(["claps"], () => getClapsCount())

    return (
        <>
            {data && (
                <Button title="Recieved claps" radius="md" variant="light" className={classes.link} leftIcon={<ClapIcon size={16} name="wave" />}>
                    {/* {doubleDigit(data.data.claps)} */}
                    <CountUp end={data.data.claps} />
                </Button>
            )}
        </>
    )
}
