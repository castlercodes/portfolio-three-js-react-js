import React from 'react';
import { MutatingDots} from 'react-loader-spinner'
import './Loader.css';
import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html>
        <div className='loader'>
            <div>Loading 3D Objects</div>
            <MutatingDots
                height="100"
                width="100"
                color="white"
                secondaryColor= 'white'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
        </div>
    </Html>
  );
};

export default Loader;
