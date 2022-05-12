import { useMemo, useRef, useState, useEffect } from "react";
import {
    Paper,
    createStyles,
    SegmentedControl,
    Center,
    Box,
    Group,
    Autocomplete,
    Switch,
    Button,
    Text,
    Select,
    ActionIcon,
} from "@mantine/core";
import { RichTextEditor, Editor } from "@mantine/rte";
import { FaPoll } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import axios from "axios";
import { ImageDropzone } from "../ImageDropzone";
import { Eye, Hash, MoodSmile, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";

const useStyles = createStyles((theme) => ({
    editor: {
        width: "100%",
        marginBottom: theme.spacing.sm,
        borderWidth: theme.colorScheme === 'dark' ? 0 : 1,
        borderStyle: 'solid',
        borderColor: theme.colorScheme === 'dark' ? "transparent" : theme.colors.gray[4],
    },
    dropdown: {
        width: 150,
    },
}));

const initialValue = "";

interface props {
    toogle: () => void;
}

export function DiscussionPostTab({ toogle }: props) {
    const [text, setText] = useState(initialValue);
    const { classes } = useStyles();
    const [category, setCategory] = useState<any | null>(null);
    const [visibility, setVisibility] = useState<any | null>(null);
    const [checked, setChecked] = useState(false);
    const editorRef = useRef<Editor>(null);

    useEffect(() => {
        editorRef?.current?.focus();
    }, []);

    const insertText = (text: string) => {
        const quillRef = editorRef?.current?.getEditor();
        var range = quillRef?.getSelection();
        let position = range ? range.index : 0;
        quillRef?.insertText(position, text);
    };

    const mentions = useMemo(
        () => ({
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["@"],
            source: async (
                searchTerm: string,
                renderList: (arg0: { id: number; value: string }[]) => void
            ) => {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/users"
                );
                const result = response.data.map(
                    (item: { id: number; name: string }) => {
                        return { id: item.id, value: item.name };
                    }
                );
                renderList(result);
            },
        }),
        []
    );

    return (
        <>
            <RichTextEditor
                value={text}
                onChange={setText}
                className={classes.editor}
                ref={editorRef}
                mentions={mentions}
                placeholder="Start typing here...."
                spellCheck={false}
                controls={[
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote", "code"],
                    ["unorderedList", "orderedList"],
                    ["alignLeft", "alignCenter", "alignRight"],
                    ["clean"],
                ]}
            />
            <Group>
                <EmojiPopover insertText={insertText} />
                <Select
                    placeholder="Pick a Category"
                    data={[
                        { value: "1", label: "React" },
                        { value: "2", label: "Angular" },
                        { value: "3", label: "Svelte" },
                        { value: "4", label: "Vue" },
                    ]}
                    icon={<Hash size={16} />}
                    searchable
                    nothingFound="No options"
                    value={category}
                    onChange={(e) => setCategory(e)}
                    size="xs"
                    className={classes.dropdown}
                />
                <Select
                    placeholder="Visibility"
                    data={[
                        { value: "1", label: "Public" },
                        { value: "2", label: "Closed" },
                        { value: "3", label: "Private" },
                    ]}
                    icon={<Eye size={16} />}
                    searchable
                    nothingFound="No options"
                    value={visibility}
                    onChange={(e) => setVisibility(e)}
                    size="xs"
                    className={classes.dropdown}
                />
                <Switch
                    label="Announcement"
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                />
                <Button size="xs" ml="auto" color="gray" onClick={() => toogle()}>
                    Close
                </Button>
                <Button size="xs" leftIcon={<Send size={16} />}>
                    Submit
                </Button>
            </Group>
            <ImageDropzone disabled={false} /></>
    );
}
