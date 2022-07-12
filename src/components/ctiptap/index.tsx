import { Editor } from './Editor'

export function Ctiptap({ text, setText, limit=5000, minimal=false }: { text: string, setText: (params: string) => void, limit?: number, minimal?: boolean }) {
    return (
        <Editor text={text} setText={setText} limit={limit} minimal={minimal} />
    )
}