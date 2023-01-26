"use client";

import { animated, config, useSpringValue } from "@react-spring/web";
import React from "react";

export interface AnimatedPathProps {
  d: string;
  /* The ratio of the animated path length to the full path */
  animatedPathRatio: number;
}

export const AnimatedPath: React.FC<AnimatedPathProps> = ({
  d,
  animatedPathRatio,
}) => {
  const pathRef = React.createRef<SVGPathElement>();
  const [pathLength, setPathLength] = React.useState(0);
  const strokeDashoffset = useSpringValue<number>(0, { config: config.stiff });

  React.useEffect(() => {
    const path = pathRef.current;
    if (!path) {
      return;
    }
    const scale = path.getBoundingClientRect().width / path.getBBox().width;
    const scaledLength = path.getTotalLength() * scale;
    setPathLength(scaledLength);
  }, [pathRef]);

  React.useEffect(() => {
    const about = document.querySelector("main > section:nth-of-type(2)");
    if (!about) {
      return;
    }

    const handleScroll = () => {
      const scrollProgress =
        1 - about.getBoundingClientRect().top / window.innerHeight;
      const pathProgress = pathLength * scrollProgress;
      const startingPosition = pathLength + pathLength / animatedPathRatio;
      strokeDashoffset.start(startingPosition - pathProgress);
    };
    // run once on load
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animatedPathRatio, pathLength, strokeDashoffset]);

  return (
    <animated.path
      ref={pathRef}
      vectorEffect="non-scaling-stroke"
      style={{
        strokeDashoffset,
        opacity: !pathLength ? 0 : 1,
        strokeDasharray: `${pathLength / animatedPathRatio} ${pathLength}`,
      }}
      d={d}
    />
  );
};