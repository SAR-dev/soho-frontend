import { createStyles, Stack, Divider } from '@mantine/core';
import { Comments } from '../comment/Comments';
import { DiscussionPostCard } from './DiscussionPostCard';
import { CreateComment } from '../comment/CreateComment';

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        position: "relative",
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        paddingBottom: theme.spacing.xl
    }
}));

interface Props {
    postedAt: string;
    body: string;
    temp: string;
    author: {
        name: string;
        image: string;
    };
}

export function PostDetails({
    postedAt,
    body,
    author,
    temp,
}: Props) {
    const { classes } = useStyles();
    return (
        <Stack spacing={0}>
            <Stack className={classes.wrapper}>
                <DiscussionPostCard author={author} temp={temp} postedAt={postedAt} body={body} />
                <CreateComment />
            </Stack>
            <Divider />
            <Stack className={classes.wrapper}>
                <Comments />
            </Stack>
        </Stack>
    )
}