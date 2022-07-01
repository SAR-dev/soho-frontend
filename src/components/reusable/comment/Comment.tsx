import { CommentDataParam } from '@interfaces/comment';
import { CommentReplyLayout } from './CommentReplyLayout';

export function Comment({comment, postId}: {comment: CommentDataParam, postId: number}) {
    return (
        <CommentReplyLayout data={comment} postId={postId} layout='comment' />
    )
}
