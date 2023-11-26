import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export function Navigation({x, y, z}) {
  const group = useRef();
  const { camera } = useThree();

  useFrame(({ clock, camera}) => {

    const position = new Vector3(x, y, z + 5);
    const cameraTarget = new Vector3(x, y, z);

    const cameraPosition = new Vector3().copy(position);

    camera.position.lerp(cameraPosition, 0.05);
    camera.lookAt(cameraTarget);
  });

  return (
    <group ref={group}>
      {/* Your 3D scene content goes here */}
    </group>
  );
}
