import { FC } from 'react';
import {
  Box,
  BoxComponentProps,
  MantineColor,
  MantineFontSize,
} from '@mantine/core';

import classes from './icon.module.scss';

import * as Svgs from './svgs';

type IconProps = {
  name: keyof typeof Svgs;
  color?: MantineColor;
  fontSize?: MantineFontSize;
} & BoxComponentProps;
export const Icon: FC<IconProps> = ({
  name,
  color = 'inherit',
  fontSize = '1rem',
  className,
  ...props
}) => {
  const SVG = Svgs[name];
  const classNames = `${classes.icon__wrapper} ${className || ''}`;
  return (
    <Box c={color} {...props} w={fontSize} className={classNames} {...props}>
      <SVG />
    </Box>
  );
};
