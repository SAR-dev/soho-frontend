import { CommentDataParam } from '@interfaces/comment';
import { CommentReplyLayout } from './CommentReplyLayout';

export function Comment({...params}: CommentDataParam) {
    return (
        <CommentReplyLayout data={params} layout='comment' />
    )
}
