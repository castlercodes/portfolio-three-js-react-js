import React from "react";
import { Canvas } from "@react-three/fiber";
import { Space } from "../models/Space.jsx";
import './page.css'

const Home = () => {
  return (
    <section className="home">
      <Canvas camera={{ near: 0.1, far: 1000 }} style={{ height: "100vh", width: "100%" }}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />

        <Space position={[0, 0, 0]} />
      </Canvas>
    </section>
  );
};

export default Home;
