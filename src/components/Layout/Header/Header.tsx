import { Button, Flex, Group, Text } from "@mantine/core";
import Image from "next/image";
import Logo from "@/assets/logo.png";

import React, { FC } from "react";

import classes from "./header.module.scss";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <header className={classes.header}>
      <Group>
        <Link href="/">
          <Image src={Logo} alt="File system app" width={35} />
        </Link>
        <Text size="lg" c="primary.9">
          File System
        </Text>
      </Group>
      {/* todo add github & theme <Group>
        <Button></Button>
      </Group> */}
    </header>
  );
};
