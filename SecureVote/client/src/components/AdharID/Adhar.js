import React from 'react';
import { Heading } from '../../globalStyles';
import { IconContext } from 'react-icons/lib';
import './AdharStyle';



import {
    FaceSection,
    FaceWrapper,
    FaceContainer,
    FaceCardInfo,
    FaceCard,
    Button,
} from './AdharStyle';

import Particle2 from '../Particle2';


function Adhar() {
    return (

        <IconContext.Provider value={{ color: '#a9b3c1', size: '1rem' }}>
            <Particle2 />
            <FaceSection id="Face">

                <FaceWrapper>
                    <Heading >Adhar ID</Heading>
                    <br />

                    <FaceContainer>
                        <FaceCard >
                            <FaceCardInfo>
                                <p>Front</p>
                            </FaceCardInfo>
                        </FaceCard>
                        <FaceCard >
                            <FaceCardInfo>
                                <p>Back</p>
                            </FaceCardInfo>
                        </FaceCard>
                    </FaceContainer>
                    <br />
                    <br />
                    <br /> <br /> <br /> <br /><br /><br /><br />
                    <br />
                    <br />
                    <br />

                </FaceWrapper>
                <div className='btn-div'>
                <button class="btn-17">
                <span class="text-container">
                <span class="text">Proceed</span>
                </span>
                </button>
                </div>
            </FaceSection>

        </IconContext.Provider>
        

    );
}
export default Adhar;
