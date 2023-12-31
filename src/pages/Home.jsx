import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Space } from "../models/Space.jsx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import './page.css'
import { Stylized_Planet } from "../models/Stylized_Planet.jsx";
import { Raycaster } from "three";
import spacesound1 from "../assets/music/a-space-journey-through-the-solar-system-153272.mp3"
import { Navigation } from "../models/Navigation.jsx";
import { Html, Text } from "@react-three/drei";
import Contact from "../Components/Contact.jsx";
import Loader from "../Components/Loader.jsx";
import { Sun } from "../models/Sun.jsx";
import { Meteor } from "../models/Meteor.jsx";
import { Mercury } from "../models/Mercury.jsx";
import { MeteorShower } from "../models/MeteorShower.jsx";
import PopupCard from "../Components/PopupCard.jsx";
import {useNavigate} from "react-router-dom"

const Home = () => {
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const raycaster = new Raycaster();
  const [isPlayingspacesound1, setIsPlayingspacesound1] = useState(true);
  const [position, setPosition] = useState({x:0, y:0, z:0});
  const [popupCard, setPopupCard] = useState("");
  const [navigateButtons, setNavigateButtons] = useState(false);
  const spacesound1Ref = useRef(new Audio(spacesound1));
  const [introText, setIntroText] = useState("");
  spacesound1Ref.current.volume = 0.6;
  spacesound1Ref.current.loop = true;
  const navigate = useNavigate();

  useEffect(() => {
    if(isPlayingspacesound1){
      // spacesound1Ref.current.play();
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
    const isNearStylizedPlanet = (
      Math.abs(position.x - biStylizedPlanetPosition[0]) <= 1 &&
      Math.abs(position.y - biStylizedPlanetPosition[1]) <= 1 &&
      Math.abs(position.z - biStylizedPlanetPosition[2]) <= 5
    );

    const isNearMercury = (
      Math.abs(position.x - biMercuryPosition[0]) <= 1 &&
      Math.abs(position.y - biMercuryPosition[1]) <= 1 &&
      Math.abs(position.z - biMercuryPosition[2]) <= 5
    );

    const isNearSun = (
      Math.abs(position.x - biSunPosition[0]) <= 1 &&
      Math.abs(position.y - biSunPosition[1]) <= 1 &&
      Math.abs(position.z - biSunPosition[2]) <= 5
    );

    if (isNearStylizedPlanet) {
      setPopupCard("Contact Me")
    }
    else if(isNearMercury){
      setPopupCard("Projects");
    }
    else if(isNearSun){
      setPopupCard("About Me");
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
      screenPosition = [5, 8, -20];
    }
    else if(canvasSize.width < 700){
      screenScale = [1, 1, 1];
      screenPosition = [10, 8, -20];
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

  const adjustMercuryForScreenSize = () => {
    let screenScale, screenPosition;

    if(canvasSize.width < 440){
      screenScale = [1, 1, 1];
      screenPosition = [-3, -6, -20];
    }
    else if(canvasSize.width < 700){
      screenScale = [1, 1, 1];
      screenPosition = [-3, -6, -20];
    }
    else if (canvasSize.width < 1200) {
      screenScale = [1, 1, 1];
      screenPosition = [-3, -6, -20];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [-3, -6, -20];
    }

    return [screenScale, screenPosition];
  };

  const adjustSunForScreenSize = () => {
    let screenScale, screenPosition;

    if(canvasSize.width < 440){
      screenScale = [0.1, 0.1, 0.1];
      screenPosition = [6, 0, -20];
    }
    else if(canvasSize.width < 700){
      screenScale = [0.1, 0.1, 0.1];
      screenPosition = [8, 0, -20];
    }
    else if (canvasSize.width < 1200) {
      screenScale = [0.1, 0.1, 0.1];
      screenPosition = [15, 0, -20];
    } else {
      screenScale = [0.1, 0.1, 0.1];
      screenPosition = [25, 0, -20];
    }

    return [screenScale, screenPosition];
  };

  const adjustSpaceForScreenSize = () => {
    let screenScale, screenPosition;
    if(canvasSize.width < 400){
      screenScale = [0.6, 0.7, 0.7];
      screenPosition = [15, -25, -50];
    }
    else if(canvasSize.width < 700){
      screenScale = [0.6, 0.7, 0.7];
      screenPosition = [20, -25, -50];
    }
    else if (canvasSize.width < 1200) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [30, -25, -50];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [60, -30, -50];
    }

    return [screenScale, screenPosition];
  };

  useEffect(() => {
    const introduction = () => {
      setTimeout(() => {
        setIntroText("Click on the Planets to know more about Me");
      }, 1000);
      
      setTimeout(() => {
        setIntroText("")
        setPosition({x : biMercuryPosition[0], y : biMercuryPosition[1], z : biMercuryPosition[2]})
      }, 4000);

      setTimeout(() => {
        setIntroText("")
        setPosition({x : biSunPosition[0], y : biSunPosition[1], z : biSunPosition[2]})
      }, 6000);

      setTimeout(() => {
        setIntroText("")
        setPosition({x : biStylizedPlanetPosition[0], y : biStylizedPlanetPosition[1], z : biStylizedPlanetPosition[2]})
      }, 8000);

      setTimeout(() => {
        setIntroText("");
        setPosition({x:0, y:0, z:0});
      }, 10000);
    };
  
    // Call the introduction function
    // introduction();
  }, []);

  const handleClickStylizedPlanet = (e) => {
    setPosition({x : biStylizedPlanetPosition[0], y : biStylizedPlanetPosition[1], z : biStylizedPlanetPosition[2]})
  }

  const handleClickSun = (e) => {
    setPosition({x : biSunPosition[0], y : biSunPosition[1], z : biSunPosition[2]})
  }

  const handleClickMercury = (e) => {
    setPosition({x : biMercuryPosition[0], y : biMercuryPosition[1], z : biMercuryPosition[2]})
  }

  const handleClickSpace = (e) => {
    setPosition({x : biSpacePosition[0], y : biSpacePosition[1], z : biSpacePosition[2]})
  }

  const [biStylizedPlanetScale, biStylizedPlanetPosition] = adjustStylizedPlanetForScreenSize();
  const [biSunScale, biSunPosition] = adjustSunForScreenSize();
  const [biSpaceScale, biSpacePosition] = adjustSpaceForScreenSize();
  const [biMercuryScale, biMercuryPosition] = adjustMercuryForScreenSize();

  const handleClick = () => {
    navigate("/projects/virtualAvatar");
  }

  return (
    <section className="home">
      {popupCard != "" && <PopupCard text={popupCard}/>}
      {popupCard == "" 
      && 
      <div>
        <div className="topintro">
          <div className="intro">Jeevan Alexen's Portfolio</div>
          {/* <div className="introdesc" onClick={handleClick}>Click here to see virtual avatar</div> */}
        </div>
        <div className="pagedesc">
          {/* <div>Find More About ME by clicking on the planets</div> */}
        </div>
      </div>
      }
      <Canvas camera={{ near: 0.1, far: 1000 }} style={{ height: canvasSize.height, width: canvasSize.width }}>
        <Suspense fallback={<Loader />} >
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={10} />
          <group onClick={handleClickSun}><Sun position={biSunPosition} scale={biSunScale}/></group>
          <Space position={[-4, -2, 0]}/>
          {/* <Space position={biSpacePosition}/> */}
          <Meteor scale={[0.3, 0.3, 0.3]}/>
          {/* <MeteorShower scale={[0.3, 0.3, 0.3]} /> */}
          <group onClick={handleClickMercury}><Mercury scale={[0.01, 0.01, 0.01]} position={biMercuryPosition}/></group>
          <group onClick={handleClickStylizedPlanet}><Stylized_Planet position={biStylizedPlanetPosition} scale={biStylizedPlanetScale} /></group>
          <Navigation x={position.x} y={position.y} z={position.z}/>
          {introText && 
          <Html center>
            <div
              style={{
                background: "white", // White background with fade effect
                color: "black", // Black text color
                padding: "10px",
                borderRadius: "5px",
                width: "200px",
                fontSize: "20px",
              }}
            >
              {introText}
            </div>
          </Html>
          }
          </Suspense>
      </Canvas>
      {navigateButtons == false
      &&
      <div className="navigatebutton hidenavigatebutton">
        <div className="innernavigate"onClick={() => {
          setNavigateButtons(true)
        }}>
          <FaChevronUp />
          <div className="navigatetext">Show Navigate Buttons</div>
        </div>
        <button className="button reset-button hidereset" onClick={resetPosition}>Reset</button>
      </div>
      }
      {navigateButtons == true
      &&
      <div className="navigation-buttons">
        <FaChevronDown className="navigatebutton" color="white"  onClick={() => {
          setNavigateButtons(false);
        }}/>
        <button className="button" onClick={() => handleNavigation("down")}>Up</button>
        <div className="horizontal-buttons">
          <button className="button leftright" onClick={() => handleNavigation("right")}>Left</button>
          <button className="button forback" onClick={() => handleNavigation("forward")}>Forward</button>
          <button className="button reset-button" onClick={resetPosition}>Reset</button>
          <button className="button forback" onClick={() => handleNavigation("backward")}>Backward</button>
          <button className="button leftright" onClick={() => handleNavigation("left")}>Right</button>
        </div>
        <button className="button" onClick={() => handleNavigation("up")}>Down</button>
      </div>
      }
    </section>
  );
};

export default Home;
