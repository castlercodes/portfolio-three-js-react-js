/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Shady Tex (https://sketchfab.com/ShadyTex4u)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/realistic-jupiter-993ba62a539e4c308e9e3137df454ed6
Title: Realistic Jupiter
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import mercury from "../assets/3d/realistic_jupiter.glb"
import { useFrame } from "@react-three/fiber";

export function Mercury(props) {
  const { nodes, materials } = useGLTF(mercury);
  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.01;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere_Material_0.geometry}
            material={materials.Material}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={101}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(mercury);
