import { FullScreenDropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useMantineTheme } from '@mantine/core';
import { dropzoneChildren } from './dropzoneChildren';

export function ImageDropzone({ disabled }: { disabled: boolean }) {
    const theme = useMantineTheme();
    return (
        <FullScreenDropzone
            disabled={disabled}
            accept={IMAGE_MIME_TYPE}
            onDrop={(files) => {
                console.log(files);
            }}>
            {(status) => dropzoneChildren(status, theme)}
        </FullScreenDropzone>
    );
}