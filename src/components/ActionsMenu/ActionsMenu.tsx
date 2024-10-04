import { ActionIcon, Menu, Text } from "@mantine/core";
import React, { FC, useState } from "react";
import { Icon } from "../Icon";
import { ConfirmationModal } from "../ConfirmationModal";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { deleteItem } from "@/lib/store/features/Directories";

type ActionsMenuProps = {
  canEdit?: boolean;
  canDelete?: boolean;
  itemType: "File" | "Folder";
  itemFullPath: string;
  onUpdate?: () => void;
};
type ActionType = { type: "edit" | "delete"; fn: () => void };
export const ActionsMenu: FC<ActionsMenuProps> = ({
  canEdit = false,
  canDelete = true,
  itemType,
  itemFullPath,
}) => {
  const [opened, modalHandlers] = useDisclosure(false);
  const [action, setAction] = useState<ActionType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const renderModal = () => {
    return (
      <ConfirmationModal
        action={action?.type}
        type={itemType}
        opened={opened}
        onClose={modalHandlers.close}
        onSave={action?.fn}
        loading={isLoading}
      />
    );
  };

  const onDeleteClick = () => {
    setAction({ type: "delete", fn: handleDeleteItem });
    modalHandlers.open();
  };

  const handleDeleteItem = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE}/api/directories`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: itemFullPath }),
        }
      );
      await response.json();
      const type = itemType === "File" ? "files" : "folders";
      dispatch(deleteItem({ path: itemFullPath, itemType: type }));
    } catch {
    } finally {
      modalHandlers.close();
      setIsLoading(false);
    }
  };

  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <ActionIcon variant="subtle" aria-label={itemType + " Options"}>
          <Icon name="VerticalDots" color="grey" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>
        <Menu.Item
          disabled={!canEdit}
          color="secondary.7"
          leftSection={
            <Icon name="Edit" color="secondary.7" fontSize="0.875rem" />
          }
        >
          <Text size="sm"> Edit </Text>
        </Menu.Item>
        <Menu.Item
          disabled={!canDelete}
          color="red"
          leftSection={<Icon name="Trash" fontSize="0.875rem" />}
          onClick={onDeleteClick}
        >
          <Text size="sm"> Delete </Text>
        </Menu.Item>
      </Menu.Dropdown>
      {renderModal()}
    </Menu>
  );
};
