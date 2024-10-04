import { ActionIcon, Menu, Text } from "@mantine/core";
import React, { FC } from "react";
import { Icon } from "../Icon";

type ActionsMenuProps = {
  canEdit?: boolean;
  canDelete?: boolean;
  onUpdate?: () => void;
  itemType?: "File" | "Folder";
};

export const ActionsMenu: FC<ActionsMenuProps> = ({
  canEdit = true,
  canDelete = true,
  itemType,
}) => {
  return (
    <Menu shadow="md" width={150} >
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
        >
          <Text size="sm"> Delete </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
