import { Button, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";

const modals = useModals();

export const openConfirmModal = () =>
  modals.openConfirmModal({
    title: "Please confirm your action",
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a
        modal. Please click one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: "Confirm", cancel: "Cancel" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => console.log("Confirmed"),
  });
