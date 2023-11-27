import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Space } from "../models/Space.jsx";
import './page.css'
import { Stylized_Planet } from "../models/Stylized_Planet.jsx";
import { Raycaster } from "three";
import spacesound1 from "../assets/music/a-space-journey-through-the-solar-system-153272.mp3"
import { Navigation } from "../models/Navigation.jsx";
import { Text } from "@react-three/drei";
import { Space_Ship } from "../models/Space_Ship.jsx";
import { Meteor } from "../models/Meteor.jsx";

const Home = () => {
  let textwidthsize = 20
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const raycaster = new Raycaster();
  const [isPlayingspacesound1, setIsPlayingspacesound1] = useState(true);
  const [position, setPosition] = useState({x:0, y:0, z:0});

  const spacesound1Ref = useRef(new Audio(spacesound1));
  spacesound1Ref.current.volume = 0.6;
  spacesound1Ref.current.loop = true;

  useEffect(() => {
    if(isPlayingspacesound1){
      spacesound1Ref.current.play();
    }
  }, [isPlayingspacesound1])

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Check if the user's position is close to the planet's position
    const isNearPlanet = (
      Math.abs(position.x - biStylizedPlanetPosition[0]) <= 1 &&
      Math.abs(position.y - biStylizedPlanetPosition[1]) <= 1 &&
      Math.abs(position.z - biStylizedPlanetPosition[2]) <= 5
    );

    console.log(Math.abs(position.x - biStylizedPlanetPosition[0]))
    console.log(Math.abs(position.y - biStylizedPlanetPosition[1]))
    console.log(Math.abs(position.z - biStylizedPlanetPosition[2]))

    if (isNearPlanet) {
      console.log("you have reached near planet")
    }
  
  }, [position]);


  const handleNavigation = (direction) => {
    switch (direction) {
      case "up":
        setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
        break;
      case "down":
        setPosition((prev) => ({ ...prev, y: prev.y - 1 }));
        break;
      case "left":
        setPosition((prev) => ({ ...prev, x: prev.x - 1 }));
        break;
      case "right":
        setPosition((prev) => ({ ...prev, x: prev.x + 1 }));
        break;
      case "forward":
        setPosition((prev) => ({ ...prev, z: prev.z - 1 }));
        break;
      case "backward":
        setPosition((prev) => ({ ...prev, z: prev.z + 1 }));
        break;
      default:
        break;
    }
  };

  const adjustStylizedPlanetForScreenSize = () => {
    let screenScale, screenPosition;

    if(canvasSize.width < 440){
      screenScale = [1, 1, 1];
      screenPosition = [7, 8, -20];
    }
    else if(canvasSize.width < 700){
      screenScale = [1, 1, 1];
      screenPosition = [12, 8, -20];
    }
    else if (canvasSize.width < 1200) {
      screenScale = [1, 1, 1];
      screenPosition = [15, 8, -20];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [20, 8, -20];
    }

    return [screenScale, screenPosition];
  };

  const adjustSpaceForScreenSize = () => {
    let screenScale, screenPosition;
    if(canvasSize.width < 400){
      screenScale = [0.6, 0.7, 0.7];
      screenPosition = [0, -1, 0];
      textwidthsize = 0.8
    }
    else if(canvasSize.width < 700){
      screenScale = [0.6, 0.7, 0.7];
      screenPosition = [0, -1, 0];
      textwidthsize = 1
    }
    else if (canvasSize.width < 1200) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -1, 0];
      textwidthsize = 10
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -1, 0];
    }

    return [screenScale, screenPosition];
  };

  const handleClickStylizedPlanet = () => {

  }

  const [biStylizedPlanetScale, biStylizedPlanetPosition] = adjustStylizedPlanetForScreenSize();
  const [biSpaceScale, biSpacePosition] = adjustSpaceForScreenSize();

  return (
    <section className="home">
      <Canvas camera={{ near: 0.1, far: 1000 }} style={{ height: canvasSize.height, width: canvasSize.width }}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={10} />

        <Space position={biSpacePosition} scale={biSpaceScale}/>
        <group onClick={handleClickStylizedPlanet}><Stylized_Planet position={biStylizedPlanetPosition} scale={biStylizedPlanetScale} /></group>
        {/* <Space_Ship scale={[0.2, 0.2, 0.2]}/> */}
        <Meteor scale={[0.2, 0.2, 0.2]}/>
        <Navigation x={position.x} y={position.y} z={position.z}/>
        <Text position={[0, 0, -2]} fontSize={1} color="#ffffff" maxWidth={textwidthsize} textAlign="center">
          Jeevan Alexen Kavalam
        </Text>
      </Canvas>
      <div className="navigation-buttons">
        <button onClick={() => handleNavigation("up")}>Up</button>
        <button onClick={() => handleNavigation("down")}>Down</button>
        <button onClick={() => handleNavigation("left")}>Left</button>
        <button onClick={() => handleNavigation("right")}>Right</button>
        <button onClick={() => handleNavigation("forward")}>Forward</button>
        <button onClick={() => handleNavigation("backward")}>Backward</button>
      </div>
    </section>
  );
};

export default Home;
