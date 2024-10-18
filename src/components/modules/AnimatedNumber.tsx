"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function AnimatedNumber({
  from,
  to,
  duration = 2.5,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        // @ts-expect-error
        node.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to, duration]);

  return <span ref={nodeRef} />;
}
