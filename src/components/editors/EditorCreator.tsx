import { useMemo, useRef, useState } from "react";
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
    Avatar,
    Input,
    ActionIcon,
    ThemeIcon,
    Badge,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { FaPoll } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import axios from "axios";
import "./EditorStyles.css";
import { ImageDropzone } from "./ImageDropzone";
import { BrandTwitter, Hash, Photo, Send } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    container: {
        width: "100%",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        padding: theme.spacing.sm
    },
    menus: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
        marginBottom: theme.spacing.sm,
        width: "100%"
    },
    editor: {
        width: "100%",
        marginBottom: theme.spacing.sm,
        border: 'none'
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        marginRight: theme.spacing.md,
        marginLeft: theme.spacing.md
    },
    photoButton: {
        cursor: 'pointer',
        width: 38,
        height: 38,
        flexShrink: 0
    }
}));

export function EditorCreator() {
    const { classes } = useStyles();

    return (
        <Paper radius={0}>
            <Paper className={classes.container}>
                <div className={classes.flex}>
                    <Avatar src="https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png" radius="xl" />
                    <Input 
                        className={classes.input} 
                        width="100%" 
                        placeholder="Sayed Rafi, What's on your mind ?" 
                        icon={<BrandTwitter size={20} />} 
                        rightSectionWidth={75}
                        styles={{ rightSection: { pointerEvents: 'none' } }}
                        rightSection={
                            <Badge color="blue" variant="filled">
                                Public
                            </Badge>
                        } />
                    <ThemeIcon className={classes.photoButton} radius="xl" color="gray"><Photo size={20} /></ThemeIcon>
                </div>
            </Paper>
        </Paper>
    );
}
