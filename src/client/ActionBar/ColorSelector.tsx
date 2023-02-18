"use client";

import { a } from "@react-spring/web";
import { ColorContext } from "client/ColorContext";
import React from "react";
import { Color } from "utils/theme";
import useTimedSpring from "client/useTimedSpring";
import { ActionBarButton } from "./ActionBarButton";
import styles from "./ColorSelector.module.scss";

export default function ColorSelector({ color }: { color: Color }) {
  const [style, trigger] = useTimedSpring();
  const { color: currentColor, setColor } = React.useContext(ColorContext);

  const onClick = React.useCallback(() => {
    setColor(color);
    if (color === currentColor) {
      trigger({ rotation: -4, x: -4 });
    } else {
      trigger({ y: 3 });
    }
  }, [color, currentColor, setColor, trigger]);

  return (
    <ActionBarButton focusArrowColor={color}>
      <a.button
        style={style}
        className={styles.colorSelector}
        data-color={color}
        // TODO: figure out aria-pressed without state
        aria-pressed={color === currentColor}
        aria-label={color}
        onClick={onClick}
      />
    </ActionBarButton>
  );
}
