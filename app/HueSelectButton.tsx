"use client";

import { Action } from "components/Action";
import { Interaction } from "components/Interaction";
import { useSetAtom } from "jotai";
import React from "react";
import { Target } from "react-feather";
import { customHuePopoverAtom } from "store";
import { ActionName } from "utils/rum";

export interface HueSelectButtonProps {
  children: React.ReactNode;
}

export const HueSelectButton: React.FC<HueSelectButtonProps> = ({
  children,
}) => {
  const setShowPopover = useSetAtom(customHuePopoverAtom);

  return (
    <Action name={ActionName.TOGGLE_HUE_SLIDER} from="home">
      <Interaction
        component="span"
        role="button"
        tabIndex={0}
        icon={Target}
        onClick={() => setShowPopover(true)}
      >
        {children}
      </Interaction>
    </Action>
  );
};
