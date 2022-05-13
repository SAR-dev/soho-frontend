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
    Textarea,
} from "@mantine/core";
import { RichTextEditor, Editor } from "@mantine/rte";
import { FaPoll } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import axios from "axios";
import { ImageDropzone } from "../ImageDropzone";
import { Eye, Hash, MoodSmile, Send } from "tabler-icons-react";
import { EmojiPopover } from "../EmojiPopover";
import insertTextAtCursor from 'insert-text-at-cursor';

const useStyles = createStyles((theme) => ({
    editor: {
        width: "100%",
        marginBottom: theme.spacing.sm,
    },
    dropdown: {
        width: 150,
    },
    textArea: {
        ['textarea']: {
            fontSize: theme.fontSizes.lg,
            '&::-webkit-input-placeholder': {
                fontSize: theme.fontSizes.sm,
              },
        }
    }
}));

const initialValue = "";

interface props {
    toogle: () => void;
}

export function AmaPostTab({ toogle }: props) {
    const [text, setText] = useState(initialValue);
    const { classes, cx } = useStyles();
    const [visibility, setVisibility] = useState<any | null>(null);

    function isInputElement(elem: HTMLElement | null): elem is HTMLInputElement {
        if (!elem) {
            return false;
        }

        return true
    }

    const insertText = (text: string) => {
        const el = document.getElementById('emoji-textarea');
        if (isInputElement(el)) {
            insertTextAtCursor(el, text);
        }
    };

    return (
        <>
            <Textarea
                placeholder="Start typing here...."
                autosize
                minRows={2}
                value={text}
                autoFocus 
                onChange={(event) => setText(event.currentTarget.value)}
                className={cx(classes.editor, classes.textArea, "thick-border")}
                id="emoji-textarea"
            />
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
