import { Group, Text } from "@mantine/core";
import Image from "next/image";
import Logo from "@/assets/logo.png";

import React, { FC } from "react";

import classes from "./header.module.scss";
import Link from "next/link";
import { ThemeChanger } from "./ThemeChanger";

export const Header: FC = () => {
  return (
    <header className={classes.header}>
      <Group align="center" justify="space-between">
        <Link href="/">
          <Image src={Logo} alt="File system app" width={30} />
        </Link>
        <Text size="lg" c="primary">
          File System
        </Text>
      </Group>
      <Group>
        <ThemeChanger />
      </Group>
    </header>
  );
};
