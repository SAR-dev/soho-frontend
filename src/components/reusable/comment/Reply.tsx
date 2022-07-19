import { CommentDataParam, TreeCommentDataParam } from '@interfaces/comment';
import { CommentReplyLayout } from './CommentReplyLayout';

export function Reply({reply, postId, is_admin, is_moderator}: {reply: TreeCommentDataParam, postId: number, is_admin: boolean, is_moderator: boolean}) {

    return (
        <CommentReplyLayout data={reply} postId={postId} commentsCount={0} layout='reply' is_admin={is_admin} is_moderator={is_moderator} />
    )
}
