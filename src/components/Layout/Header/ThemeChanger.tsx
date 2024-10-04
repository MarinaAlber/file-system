"use client";
import { Icon } from "@/components/Icon";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { FC } from "react";

export const ThemeChanger: FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="md"
      aria-label="Toggle color scheme"
    >
      <Icon name={computedColorScheme === "light" ? "Moon" : "Sun"} />
    </ActionIcon>
  );
};
