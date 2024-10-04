import React, { FC } from "react";

import { Icon } from "@/components/Icon";
import { Anchor, Group, Paper, Text, TextProps } from "@mantine/core";

import { ActionsMenu } from "../ActionsMenu";
import Link from "next/link";

type FileProps = {
  name: string;
  path: string;
  type: "file" | "directory";
  parentPath: string;
  canEdit?: boolean;
};
export const Card: FC<FileProps> = ({ name, path, parentPath, type }) => {
  const icon = type === "file" ? "File" : "Folder";

  const renderMenu = () => {
    return (
      <ActionsMenu itemFullPath={parentPath + "/" + name} itemType={icon} />
    );
  };

  const renderName = () => {
    const textProps: Partial<TextProps> = {
      size: "sm",
      fw: 500,
      truncate: true,
      maw: "70%",
    };
    if (type === "directory") {
      const link = path !== "/" ? `${path}/${name}` : name;
      return (
        <Anchor
          component={Link}
          href={link}
          replace={false}
          c="primary"
          {...textProps}
        >
          {name}
        </Anchor>
      );
    }
    return (
      <Text c="secondary.7" {...textProps}>
        {name}
      </Text>
    );
  };

  return (
    <Paper withBorder shadow="sm" p="sm">
      <Group
        justify="space-between"
        align="center"
        c="secondary.8"
        wrap="nowrap"
        w="100%"
        gap="0.5rem"
      >
        <Group align="center" gap="0.5rem" wrap="nowrap" w="80%">
          <Icon name={icon} fontSize="0.875rem" />
          {renderName()}
        </Group>
        {renderMenu()}
      </Group>
    </Paper>
  );
};
