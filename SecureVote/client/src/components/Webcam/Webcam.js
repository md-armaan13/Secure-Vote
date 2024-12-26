import React, { useState } from 'react';
import Webcam from "react-webcam";
import './Webcam.css';

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const WebcamCapture = () => {

    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);

    
    const capture = (
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setImage(imageSrc)
        });


    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image === '' ? <Webcam
                    audio={false}
                    height={500}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={500}
                    videoConstraints={videoConstraints}
                /> : <img src={image} alt="img" />}
            </div>
            <div>
                {image !== '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className=" btn-68">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className=" btn-68">
                            Capture
                        </button>
                }
            </div>
        </div>
    );
};
