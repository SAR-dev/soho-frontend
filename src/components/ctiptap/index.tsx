import { Editor } from './Editor'

export function Ctiptap({ text, setText, limit=5000 }: { text: string, setText: (params: string) => void, limit?: number }) {
    return (
        <Editor text={text} setText={setText} limit={limit} />
    )
}