import { CommentDataParam, TreeCommentDataParam } from '@interfaces/comment';
import { CommentReplyLayout } from './CommentReplyLayout';

export function Comment({comment, postId, commentsCount = 0, is_admin, is_moderator, pinned_comment}: {comment: TreeCommentDataParam, postId: number, commentsCount?: number, is_admin: boolean, is_moderator: boolean, pinned_comment?: number}) {
    return (
        <CommentReplyLayout pinned_comment={pinned_comment} is_admin={is_admin} is_moderator={is_moderator} data={comment} postId={postId} commentsCount={commentsCount} layout='comment' />
    )
}
