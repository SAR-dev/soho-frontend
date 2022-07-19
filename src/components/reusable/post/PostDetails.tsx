import { createStyles, Stack, Divider } from '@mantine/core';
import { Comments } from '../comment/Comments';
import { DiscussionPostCard } from './DiscussionPostCard';
import { CreateComment } from '../comment/CreateComment';
import { PollPostCard } from './PollPostCard';
import { AmaPostCard } from './AmaPostCard';
import { PostDataParam } from '@interfaces/post';

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

export function PostDetails({...props}: PostDataParam) {
    const { classes } = useStyles();
    return (
        <Stack spacing={3}>
            <Stack className={classes.wrapper}>
                {props.post_type === "discussion" && <DiscussionPostCard {...props} />}
                {props.post_type === "poll" && <PollPostCard {...props} />}
                {props.post_type === "ama" && <AmaPostCard {...props} />}
                <CreateComment postId={props.id} author={props.author} />
            </Stack>
            <Stack className={classes.wrapper}>
                <Comments pinned_comment={props.pinned_comment} is_admin={props.group.is_admin} is_moderator={props.group.is_moderator} postId={props.id} members_name={props.group.members_name} />
            </Stack>
        </Stack>
    )
}