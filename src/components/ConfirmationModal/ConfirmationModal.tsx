import { Button, Group, Modal, ModalProps, Text } from "@mantine/core";
import React, { FC } from "react";

type ConfirmationModalProps = {
  onSave?: () => void;

  action?: string;
  type?: string;
  loading?: boolean;
} & ModalProps;
export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  onSave,
  action,
  type,
  loading,
  ...rest
}) => {
  const title = (
    <Text size="sm" c="secondary.7">
      Are you sure you want to {action} this {type} ?
    </Text>
  );
  return (
    <Modal title={title} size="md" centered withCloseButton {...rest}>
      <Group justify="flex-end" gap='xs'>
        <Button loading={loading} size="sm" onClick={onSave}>
          Save
        </Button>
        <Button
          disabled={loading}
          size="sm"
          variant="light"
          color="secondary"
          onClick={rest.onClose}
        >
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};
