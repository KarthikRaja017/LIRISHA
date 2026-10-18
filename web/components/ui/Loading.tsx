"use client";

import React from "react";
import { BrandLoader, BrandLoaderProps } from "./BrandLoader";

export interface LoadingProps extends BrandLoaderProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Loading live data...",
  subMessage,
  fullScreen = false,
  size = "md",
  className = "",
  ...rest
}) => {
  return (
    <BrandLoader
      message={message}
      subMessage={subMessage}
      fullScreen={fullScreen}
      size={size}
      className={className}
      {...rest}
    />
  );
};

export default Loading;
