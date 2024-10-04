'use client';
import Link from "next/link";
import React, { FC } from "react";
import { Anchor, Breadcrumbs as MantineBreadcrumbs, Flex } from "@mantine/core";

import { Icon } from "@/components/Icon";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const Breadcrumbs: FC = () => {
  const selectedDirectory = useSelector(
    (state : RootState) => state.DirectoriesReducer.selectedDirectory
  );
  const items = selectedDirectory?.split("/");
  const links = items?.map((item, index) => {
    const isFirst = index === 0 && item === "";
    const isLast = index === items.length - 1;
    const color = isLast ? "primary.9" : "primary";

    const href = isFirst ? "/" : isLast ? "#" : `${items?.slice(0, index + 1).join("/")}`;
    const label = isFirst ? (
      <Flex align="center" gap="0.25rem">
        <Icon name="Home" /> Home
      </Flex>
    ) : (
      item
    );
    return (
      <Anchor
        component={Link}
        href={href}
        key={"links_" + index}
        size="sm"
        c={color}
        truncate
        fw={600}
      >
        {label}
      </Anchor>
    );
  });
  return <MantineBreadcrumbs my="lg" separatorMargin="xs">{links}</MantineBreadcrumbs>;
};
