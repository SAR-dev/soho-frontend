import { Button, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";

const modals = useModals();

export const openDeleteModal = () =>
  modals.openConfirmModal({
    title: "Delete your profile",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete your profile? This action is destructive
        and you will have to contact support to restore your data.
      </Text>
    ),
    labels: { confirm: "Delete account", cancel: "No don't delete it" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => console.log("Confirmed"),
  });
