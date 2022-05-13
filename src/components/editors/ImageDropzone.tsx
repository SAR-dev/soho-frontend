import { FullScreenDropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Text, useMantineTheme, createStyles, Center } from "@mantine/core";
import { dropzoneChildren } from "./dropzoneChildren";
import { InfoCircle } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: theme.spacing.xs,
  },
  icon: {
      marginRight: 3
  }
}));

export function ImageDropzone({ disabled }: { disabled: boolean }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  return (
    <>
      <Center inline className={classes.footer}>
        <InfoCircle size={16} className={classes.icon} />
        <Text color="dimmed" size="xs">
          Drom images anywhere to upload.
        </Text>
      </Center>
      <FullScreenDropzone
        disabled={disabled}
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => {
          console.log(files);
        }}
      >
        {(status) => dropzoneChildren(status, theme)}
      </FullScreenDropzone>
    </>
  );
}
