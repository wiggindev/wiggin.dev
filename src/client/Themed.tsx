"use client";

import { Slot } from "@radix-ui/react-slot";
import { Context as ColorContext } from "client/providers/Color";
import React from "react";

export function Themed({ children }: { children: React.ReactNode }) {
  const { color } = React.useContext(ColorContext);

  return <Slot data-color={color}>{children}</Slot>;
}