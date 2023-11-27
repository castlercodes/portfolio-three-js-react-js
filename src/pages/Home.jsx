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
import PopupCard from "../Components/PopupCard.jsx";
import Contact from "../Components/Contact.jsx";

const Home = () => {
  let textwidthsize = 20
  let textfontsize = 1;
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const raycaster = new Raycaster();
  const [isPlayingspacesound1, setIsPlayingspacesound1] = useState(true);
  const [position, setPosition] = useState({x:0, y:0, z:0});
  const [popupCard, setPopupCard] = useState("");
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

    if (isNearPlanet) {
      setPopupCard("Contact Me")
    }
    else{
      setPopupCard("")
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

  const resetPosition = () => {
    setPosition({ x: 0, y: 0, z: 0 });
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
      screenPosition = [-3, -5, -8];
      textwidthsize = 10
      textfontsize = 0.5
    }
    else if(canvasSize.width < 700){
      screenScale = [0.6, 0.7, 0.7];
      screenPosition = [-8, -5, -8];
      textwidthsize = 10
      textfontsize = 0.6
    }
    else if (canvasSize.width < 1200) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [-10, -5, -10];
      textwidthsize = 10
      textfontsize = 1;
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [-15, -5, -10];
    }

    return [screenScale, screenPosition];
  };

  const handleClickStylizedPlanet = (e) => {
    setPosition({x : biStylizedPlanetPosition[0], y : biStylizedPlanetPosition[1], z : biStylizedPlanetPosition[2]})
  }

  const handleClickSpace = (e) => {
    setPosition({x : biSpacePosition[0], y : biSpacePosition[1], z : biSpacePosition[2]})
  }

  const [biStylizedPlanetScale, biStylizedPlanetPosition] = adjustStylizedPlanetForScreenSize();
  const [biSpaceScale, biSpacePosition] = adjustSpaceForScreenSize();

  return (
    <section className="home">
      {popupCard == "Contact Me" && <Contact />}
      <Canvas camera={{ near: 0.1, far: 1000 }} style={{ height: canvasSize.height, width: canvasSize.width }}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={10} />

        <group onClick={handleClickSpace}><Space position={biSpacePosition} scale={biSpaceScale}/> </group>
        <group onClick={handleClickStylizedPlanet}><Stylized_Planet position={biStylizedPlanetPosition} scale={biStylizedPlanetScale} /></group>
        {/* <Space_Ship scale={[0.2, 0.2, 0.2]}/> */}
        <Meteor scale={[0.2, 0.2, 0.2]}/>
        <Navigation x={position.x} y={position.y} z={position.z}/>
        <Text position={[0, 0, -2]} fontSize={textfontsize} color="#ffffff" maxWidth={textwidthsize} textAlign="center">
          Jeevan Alexen Kavalam
        </Text>
      </Canvas>
      <div className="navigation-buttons">
        <button className="button" onClick={() => handleNavigation("up")}>Up</button>
        <div className="horizontal-buttons">
          <button className="button leftright" onClick={() => handleNavigation("left")}>Left</button>
          <button className="button forbac" onClick={() => handleNavigation("forward")}>Forward</button>
          <button className="button reset-button" onClick={resetPosition}>Reset</button>
          <button className="button leftright" onClick={() => handleNavigation("backward")}>Backward</button>
          <button className="button forbac" onClick={() => handleNavigation("right")}>Right</button>
        </div>
        <button className="button" onClick={() => handleNavigation("down")}>Down</button>
      </div>
    </section>
  );
};

export default Home;
