import { createStyles, Stack, Text } from '@mantine/core';
import { Comments } from '../comment/Comments';
import { DiscussionPostCard } from './DiscussionPostCard';
import { CreateComment } from '../comment/CreateComment';
import { PostDataParam } from '@interfaces/post';
import { RiRestTimeFill } from 'react-icons/ri';

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        position: "relative",
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        paddingBottom: theme.spacing.xl
    },
    cwrapper: {
        paddingLeft: "6rem",
        display: "flex",
    },
}));

export function PostDetails({ ...props }: PostDataParam) {
    const { classes, cx } = useStyles();
    return (
        <Stack spacing={3}>
            <Stack className={classes.wrapper}>
                {props.post_type === "discussion" && <DiscussionPostCard {...props} />}
                {props.can_comment ? (
                    <CreateComment postId={props.id} author={props.author} />
                ) : (
                    <Text color="red" className={cx(classes.cwrapper)}>
                        <RiRestTimeFill size={14} />
                        <Text size="xs" ml={5}>
                            Discussion is turned off
                        </Text>
                    </Text>
                )}
            </Stack>
            <Stack className={classes.wrapper}>
                <Comments pinned_comment={props.pinned_comment} is_admin={props.group.is_admin} is_moderator={props.group.is_moderator} postId={props.id} members_name={props.group.members_name} />
            </Stack>
        </Stack>
    )
}