import { CommentDataParam, TreeCommentDataParam } from '@interfaces/comment';
import { CommentReplyLayout } from './CommentReplyLayout';

export function Comment({comment, postId, commentsCount = 0}: {comment: TreeCommentDataParam, postId: number, commentsCount?: number}) {
    return (
        <CommentReplyLayout data={comment} postId={postId} commentsCount={commentsCount} layout='comment' />
    )
}
