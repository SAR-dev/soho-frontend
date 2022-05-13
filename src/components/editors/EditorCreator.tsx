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
  Indicator,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { FaPoll } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { MdQuestionAnswer, MdEmojiPeople } from "react-icons/md";
import axios from "axios";
import { ImageDropzone } from "./ImageDropzone";
import { BrandTwitter, Hash, Photo, Send } from "tabler-icons-react";
import { HiBadgeCheck } from "react-icons/hi";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
  },
  menus: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    marginBottom: theme.spacing.sm,
    width: "100%",
  },
  editor: {
    width: "100%",
    marginBottom: theme.spacing.sm,
    border: "none",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.md,
  },
  photoButton: {
    cursor: "pointer",
    width: 38,
    height: 38,
    flexShrink: 0,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : 'transparent',
    borderWidth: 2,
    borderColor: theme.colorScheme === "dark" ? 'transparent' : theme.colors.gray[4],
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[5],
  },
  avatar: {
    borderRadius: "100%",
    padding: 3,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
    ["img"]: {
      borderRadius: "100%",
    },
  },
}));

interface props {
  toogle: () => void;
}

export function EditorCreator({ toogle }: props) {
  const { classes, cx } = useStyles();

  return (
    <Paper radius={0} onClick={() => toogle()}>
      <Paper className={classes.container}>
        <div className={classes.flex}>
            <Indicator
              inline
              size={18}
              offset={10}
              position="bottom-end"
              className="circular"
              label={<HiBadgeCheck />}
              withBorder
            >
              <Avatar
                size={60}
                src="https://relayfm.s3.amazonaws.com/uploads/person/avatar/2/user_avatar_braddowdy_artwork.png"
                alt="Sayed Rafi"
                className={classes.avatar}
              />
            </Indicator>
          <Input
            className={cx(classes.input, "thick-border")}
            width="100%"
            placeholder="Sayed Rafi, What's on your mind ?"
            icon={<BrandTwitter size={20} />}
            rightSectionWidth={75}
            styles={{ rightSection: { pointerEvents: "none" } }}
            rightSection={
              <Badge color="blue" variant="filled">
                Public
              </Badge>
            }
          />
          <ThemeIcon className={classes.photoButton} radius="xl" color="gray">
            <Photo size={20} />
          </ThemeIcon>
        </div>
      </Paper>
    </Paper>
  );
}
