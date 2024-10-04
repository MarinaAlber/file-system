"use client";
import { useFetchDirectories } from "@/hooks";
import { Box, Center, Divider, Loader, SimpleGrid, Text } from "@mantine/core";
import React, { FC } from "react";
import { Icon } from "../Icon";
import { Card } from "../Card";

type ListProps = {
  mainPath: string;
};

type Key = "folders" | "files";

export const List: FC<ListProps> = ({ mainPath }) => {
  const { isLoading, hasError, data } = useFetchDirectories({ path: mainPath });

  const renderAlterStatus = () => {
    if (isLoading) {
      return (
        <Center my="lg">
          <Loader size="sm" />
        </Center>
      );
    }
    if (hasError) {
      return (
        <Center c="red.7" my="lg">
          <Icon name="AlertTriangle" fontSize="1.75rem" me="sm" /> Something went wrong
        </Center>
      );
    }
    if (!data && !isLoading) {
      return (
        <Center c="secondary.7" my="lg">
          <Icon name="AlertTriangle" fontSize="1.75rem" me="sm" /> This folder is empty.
        </Center>
      );
    }

    return (
      <>
        {renderList("folders")}
        {renderList("files")}
      </>
    );
  };

  const renderDivider = (text: Key) => {
    const label = (
      <Text size="sm" fw={600} c="secondary.7" tt="capitalize">
        {text}
      </Text>
    );
    return <Divider my="lg" label={label} labelPosition="center" />;
  };

  const renderCards = (listKey: Key) =>
    data[listKey]?.map((item) => {
      return (
        <Card
          key={item.path + item.name}
          name={item.name}
          path={item.path}
          type={listKey === "folders" ? "directory" : "file"}
        />
      );
    });

  const renderList = (listKey: Key) => {
    if (data[listKey]?.length) {
      return (
        <>
          {renderDivider(listKey)}
          <SimpleGrid
            cols={{ base: 2, sm: 4, lg: 5 }}
            spacing={{ base: 10, sm: "lg" }}
            verticalSpacing={{ base: "md", sm: "lg" }}
          >
            {renderCards(listKey)}
          </SimpleGrid>
        </>
      );
    }

    return null;
  };

  return (
    <Box w="100%" m="auto" mih="10rem">
      {renderAlterStatus()}
    </Box>
  );
};
