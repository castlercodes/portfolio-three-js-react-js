import React, { useEffect, useRef, useState } from 'react'
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";
import { drawMesh } from "../Components/utilities";

const inputResolution = {
    width: 1080,
    height: 980,
  };
  
  const videoConstraints = {
    width: inputResolution.width,
    height: inputResolution.height,
    facingMode: "user",
  };
  
  function VirtualAvatar() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    
    const runDetector = async (video, canvas) => {
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
          runtime: "tfjs",
        };
        const detector = await faceLandmarksDetection.createDetector(
          model,
          detectorConfig
        );
        const detect = async (net) => {
          const estimationConfig = { flipHorizontal: false };
          const faces = await net.estimateFaces(video, estimationConfig);
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);

           drawMesh(faces, ctx);

        // Use requestAnimationFrame to continuously update the frames
            requestAnimationFrame(() => detect(detector));
        };
        detect(detector);
      };

    const [loaded, setLoaded] = useState(false);

    const handleVideoLoad = (videoNode) => {
        const video = videoNode.target;
        if (video.readyState !== 4) return;
        if (loaded) return;
        runDetector(video, canvasRef.current);
        setLoaded(true);
    };


    return (
      <div>
        <Webcam
            width={inputResolution.width}
            height={inputResolution.height}
            style={{ visibility: "", position: "absolute", width: "100%", height: "100%"}}
            videoConstraints={videoConstraints}
            onLoadedData={handleVideoLoad} //here we pass in the function
        />
        <canvas
          ref={canvasRef}
          width={inputResolution.width}
          height={inputResolution.height}
          style={{ position: "absolute"}}
        />
      </div>
    );
  }
  
export default VirtualAvatar
