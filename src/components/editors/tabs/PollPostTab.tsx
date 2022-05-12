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
    TextInput,
} from "@mantine/core";
import { RichTextEditor, Editor } from "@mantine/rte";
import { FaPoll } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import axios from "axios";
import { ImageDropzone } from "../ImageDropzone";
import { Eye, Hash, Minus, MoodSmile, Plus, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import { Poll } from "../../reusable/post/Poll";

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
    flex: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    textInput: {
        width: "100%"
    },
    actionButton: {
        marginLeft: theme.spacing.sm
    }
}));

const initialValue = "";

interface props {
    toogle: () => void;
}

export function PollPostTab({ toogle }: props) {
    const [text, setText] = useState(initialValue);
    const { classes } = useStyles();
    const [visibility, setVisibility] = useState<any | null>(null);
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
            <div className={classes.flex}>
                <Poll active={false} text="React Native" />
                <ActionIcon variant="filled" className={classes.actionButton}>
                    <Minus size={14} />
                </ActionIcon>
            </div>
            <div className={classes.flex}>
                <TextInput size="xs" placeholder="Add poll option" className={classes.textInput} />
                <ActionIcon variant="filled" className={classes.actionButton}>
                    <Plus size={14} />
                </ActionIcon>
            </div>
            <Group>
                <EmojiPopover insertText={insertText} />
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
