import { CommentDataParam, TreeCommentDataParam } from '@interfaces/comment';
import { CommentReplyLayout } from './CommentReplyLayout';

export function Reply({reply, postId}: {reply: TreeCommentDataParam, postId: number}) {

    return (
        <CommentReplyLayout data={reply} postId={postId} commentsCount={0} layout='reply' />
    )
}
