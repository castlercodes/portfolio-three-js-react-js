import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import space_ship from "../assets/3d/space_ship.glb";

export function Space_Ship(props) {
  const { nodes, materials } = useGLTF(space_ship);
  const group = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  useFrame(({ clock }) => {
    // Calculate position based on a sine wave
    const time = clock.getElapsedTime();
    const radius = 5;
    const speed = 1;

    const x = Math.sin(time * speed) * radius;
    const y = Math.sin(time * 0.5 * speed) * radius; // Adjust the y-coordinate for a more dynamic motion
    const z = Math.cos(time * speed) * radius;

    // Set the position of the space ship
    group.current.position.set(x, y, z);

    // Rotate the spaceship for a dynamic appearance
    group.current.rotation.y = time;

    // Adjust the dynamics of the space ship
    group.current.rotation.x = Math.sin(time * 0.2) * 0.2; // Adjust the pitch
    group.current.rotation.z = Math.sin(time * 0.2) * 0.2; // Adjust the roll
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials["03_-_Default"]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(space_ship);
