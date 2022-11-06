import { ReactNode, useState } from 'react'
import { Button, createStyles, Image, Stack, Text } from '@mantine/core';
import { MdEdit } from 'react-icons/md';

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingLeft: 10,
        borderLeftWidth: 5,
        borderLeftStyle: "solid",
        borderLeftColor: "#3A8891"
    },
    flex: {
        display: "flex",
        alignItems: "center"
    },
    uploader: {
        cursor: "pointer",
        width: 150
    }
}));

interface Element {
    label: string
    value: any
    helper?: string
}

export function EditingComponent({ children, editable = true, elements, image }: { children: ReactNode, editable?: boolean, elements?: Element[], image?: Element }) {
    const { classes, cx } = useStyles();
    const [editing, setEditing] = useState(false)

    return (
        <div className={classes.wrapper}>
            {editing ? (
                <>{children}</>
            ) : (
                <>
                    <Stack spacing="md">
                        {image && (
                            <div>
                                <Text weight={700}>{image.label}</Text>
                                <Image my="xs" height={150} width={150} withPlaceholder className={classes.uploader} src={image.value} />
                                <Text size='xs'>{image.helper}</Text>
                            </div>
                        )}
                        {elements?.map((e, i) => (

                            <div>
                                <div className={classes.flex}>
                                    <Text weight={700}>{e.label}:</Text>
                                    <Text ml="sm">{e.value === "" || e.value === 0 || e.value === 0.00 ? "Not Selected" : e.value}</Text>
                                </div>
                                <Text size='xs'>{e.helper}</Text>
                            </div>
                        ))}
                    </Stack>
                    {editable && (
                        <Text size='xs' mt="md" color="#3A8891" style={{ cursor: "pointer" }} onClick={() => setEditing(true)}>Click to update</Text>
                    )}
                </>
            )}
        </div>
    )
}