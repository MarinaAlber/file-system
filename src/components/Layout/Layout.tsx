import React, { FC, PropsWithChildren } from "react";
import { Box } from "@mantine/core";

import { Header } from "./Header";
import { Breadcrumbs } from "./Breadcrumbs";

import classes from "./layout.module.scss";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Box component="main" className={classes.content}>
        <Breadcrumbs />
        {children}
      </Box>
    </>
  );
};
