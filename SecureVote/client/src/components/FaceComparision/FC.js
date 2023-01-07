import React, { useEffect, useState } from "react";
import { Heading } from "../../globalStyles";
import { IconContext } from "react-icons/lib";
import { WebcamCapture } from "../Webcam/Webcam";
import "./FCButton.css";
import ClipLoader from "react-spinners/ClipLoader";

import { Link } from "react-router-dom";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  FaceSection,
  FaceWrapper,
  FaceContainer,
  FaceCardInfo,
  FaceCard,
  Button,
} from "./FCStyles";

import Particle2 from "../Particle2";

//const getEthereumObject = () => window.ethereum;

function FC() {
  
    const[loading,SetLoading] = useState(false);

    useEffect(() => {
      SetLoading(true)
      setTimeout(() => {
        SetLoading(false)

      }, 2000)

    }, [])
    

  const Face = () => {};
  return (
    <IconContext.Provider value={{ color: "#a9b3c1", size: "1rem" }}>
      <Particle2 />
      <FaceSection id="Face">
        <FaceWrapper>
          <Heading>Face Comparsion</Heading>
          <br />
          <br />
          <br />

          <FaceContainer>
            <FaceCard>
              <FaceCardInfo>
                <div className="style">
                {loading?
                <ClipLoader
                  loading={loading}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                :
                <WebcamCapture />
                 }
                </div>
              </FaceCardInfo>
            </FaceCard>
          </FaceContainer>
          <br />
        </FaceWrapper>

        <Link to="/pricing">
          <div className="btn-div" onClick={Face}>
            <button class="btn-68">Proceed</button>
          </div>
        </Link>
      </FaceSection>
    </IconContext.Provider>
  );
}
export default FC;
