import { Group, Text, useMantineTheme, MantineTheme, createStyles, Image, Paper, Center } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon, InfoCircle } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import { imageUploader, parseErrors } from '../../helpers';
import { useNotifications } from '@mantine/notifications';

const IMG_H = 300

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginBottom: theme.spacing.sm,
  },
  imageWrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
  },
  footer: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    cursor: "pointer",
  },
  icon: {
    marginRight: 3,
  },
  dashed: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[3]
  }
}));

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ height: IMG_H, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      <Text size="xl" inline>
        Drag thumbnail here or click to select file
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attachment file can be any image format, but should not exceed 5 MB
      </Text>
    </div>
  </Group>
);

export function PremierDropzone({ setId }: { setId: (params?: number) => void }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const notifications = useNotifications();
  const [loading, setLoading] = useState(false)
  const [src, setSrc] = useState<any>()

  function uploadImage(img: File) {
    setLoading(true)
    imageUploader(img).then(res => {
      if (res.error) {
        notifications.showNotification({
          title: "Image not uploaded",
          message: parseErrors(res.error)[0],
          color: "red",
          icon: <X size={18} />,
        });
      } else {
        setSrc(res.data.image);
        setId(res.data.id);
        setLoading(false);
      }
    })
  }

  return (
    <>
      {src ? (
        <>
          <Paper p="sm" className={cx(classes.imageWrapper, classes.dashed)}>
            <Image src={src} withPlaceholder height={IMG_H} fit="cover" radius="xs" />
          </Paper>
          <Center
            inline
            className={classes.footer}
            onClick={() => {
              setSrc(null)
              setId()
            }}
          >
            <InfoCircle size={16} className={classes.icon} />
            <Text color="dimmed" size="xs">
              Click here to select another thumbnail
            </Text>
          </Center>
        </>
      ) : (
        <Dropzone
          onDrop={(file) => uploadImage(file[0])}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          className={classes.wrapper}
          loading={loading}
          multiple={false}
        >
          {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
      )}
    </>
  );
}