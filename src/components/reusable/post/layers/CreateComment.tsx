import { useRef, useState, useEffect } from "react";
import { createStyles, Group, Switch, Button, Select, Text, Title, Center, Stack } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { TextEditor } from "../../../editors/TextEditor";
import { Author } from "./Author";
import { InfoCircle, Send } from "tabler-icons-react";
import { EmojiPopover } from "../../../editors/EmojiPopover";

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        position: "relative",
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        display: "flex",
    },
    editorWrapper: {
        width: "100%",
        fontSize: theme.fontSizes.sm
    },
    commentCreatorHeader: {
        marginBottom: theme.spacing.xs
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        ['svg']: {
            marginRight: 3
        }
    }
}));

export function CreateComment() {
    const { classes } = useStyles();
    const editorRef = useRef<Editor>(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        editorRef?.current?.focus();
    }, []);

    const insertText = (text: string) => {
        const quillRef = editorRef?.current?.getEditor();
        var range = quillRef?.getSelection();
        let position = range ? range.index : 0;
        quillRef?.insertText(position, text);
    };

    return (
        <div className={classes.wrapper}>
            <Author />
            <div className={classes.editorWrapper}>
                <Stack className={classes.commentCreatorHeader} spacing={3}>
                    <Group spacing={3}>
                        <Text size="sm">Comment as</Text>
                        <Text color="blue" size="sm">Lonewolf</Text>
                    </Group>
                    <div className={classes.info}>
                        <InfoCircle size={14} />
                        <Text size="xs" color="dimmed">Please read the community rules before commenting</Text>
                    </div>
                </Stack>
                <TextEditor editorRef={editorRef} />
                <Group>
                    <EmojiPopover insertText={insertText} />
                    <Switch
                        label="Pin this comment"
                        checked={checked}
                        onChange={(event) => setChecked(event.currentTarget.checked)}
                    />
                    <Button size="xs" ml="auto" leftIcon={<Send size={16} />}>
                        Submit
                    </Button>
                </Group>
            </div>
        </div>
    );
}
