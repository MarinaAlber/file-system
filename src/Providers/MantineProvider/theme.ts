import {
  createTheme,
  MantineColorsTuple,
  MantineThemeOverride,
  mergeMantineTheme,
  DEFAULT_THEME,
  rem,
} from "@mantine/core";
import variables from "@/Theme/variables.module.scss";
import { lexend } from "@/fonts/config";

type CustomColors = { [key: string]: MantineColorsTuple };

export const customColors: CustomColors = {
  primary: variables.primaryColor
    .replace(/\s/g, "")
    .split(",") as unknown as MantineColorsTuple,
  secondary: variables.secondaryColor
    .replace(/\s/g, "")
    .split(",") as unknown as MantineColorsTuple,
};

const themeOverride: MantineThemeOverride = {
  colors: customColors,
  primaryColor: "primary",
  primaryShade: 5,
  fontSizes: {
    xs: rem(variables.fontSize_xs),
    sm: rem(variables.fontSize_sm),
    md: rem(variables.fontSize_md),
    lg: rem(variables.fontSize_lg),
    xl: rem(variables.fontSize_xl),
  },
  fontFamily: lexend.style.fontFamily,
};

export default mergeMantineTheme(DEFAULT_THEME, createTheme(themeOverride));
