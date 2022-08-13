import { Menu, ActionIcon } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineAddReaction, MdOutlineCommentBank } from "react-icons/md";
import { Edit, Trash } from "tabler-icons-react";


interface Props {
    setEditorModal: (params: boolean) => void;
    setDeleteModal: (params: boolean) => void;
    setCanCommentModal: (params: boolean) => void;
    setCanVoteModal: (params: boolean) => void;
}

export function PostMenus({ ...props }: Props) {
    return (
        <Menu ml="auto" control={
            <ActionIcon title="Post Options">
                <BsThreeDots size={18} />
            </ActionIcon>}
        >
            <Menu.Item icon={<Edit size={14} />} onClick={() => props.setEditorModal(true)}>Update</Menu.Item>
            <Menu.Item icon={<Trash size={14} />} onClick={() => props.setDeleteModal(true)}>Delete</Menu.Item>
            <Menu.Item icon={<MdOutlineCommentBank size={14} />} onClick={() => props.setCanCommentModal(true)} >Toogle Commenting</Menu.Item>
            <Menu.Item icon={<MdOutlineAddReaction size={14} />} onClick={() => props.setCanVoteModal(true)}>Toogle Reactions</Menu.Item>
        </Menu>
    );
}
