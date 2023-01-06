import React from 'react';
import { Heading } from '../../globalStyles';
import { IconContext } from 'react-icons/lib';
import './nft.css'
import './nftlink.css'
import { WebcamCapture } from '../Webcam/Webcam';
import './FCButton.css';


// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
    FaceSection,
    FaceWrapper,
    FaceContainer,
    FaceCardInfo,
    FaceCard,
    Button,
} from './FCStyles';

import Particle2 from '../Particle2';





//const getEthereumObject = () => window.ethereum;


function FC() {
    return (

        <IconContext.Provider value={{ color: '#a9b3c1', size: '1rem' }}>
            <Particle2 />
            <FaceSection id="Face">

                <FaceWrapper>
                    <Heading >Face Comparsion</Heading>
                    <br />
                    <br/>
                    <br/>

                    <FaceContainer>
                        <FaceCard >
                            <FaceCardInfo>
                                <WebcamCapture />
                            </FaceCardInfo>
                        </FaceCard>
                    </FaceContainer>
                    <br />

                </FaceWrapper>
                <div className='btn-div'>
                <button class="btn-68">Proceed</button>

</div>
            </FaceSection>

        </IconContext.Provider>
        

    );
}
export default FC;
