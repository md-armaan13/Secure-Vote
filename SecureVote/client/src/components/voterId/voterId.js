import React, { useState } from 'react';
import { Heading } from '../../globalStyles';
import { IconContext } from 'react-icons/lib';
import './voterIdStyle';
import './voterId.css';


import { Link } from 'react-router-dom';
import UploadImg from './Untitled.jpeg';

import {
    FaceSection,
    FaceWrapper,
    FaceContainer,
    FaceCardInfo,
    FaceCardCost,
    FaceCard,
    Button,
} from './voterIdStyle';

import Particle2 from '../Particle2';


function Voter() {
    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);







    const handleImage1Change = e => {
        setImage1(e.target.files[0]);
      };
    
      const handleImage2Change = e => {
        setImage2(e.target.files[0]);
      };
    
      const handleUpload1 = () => {
        console.log("Uploading Image 1...");
        // Code to upload Image 1 goes here
      };
    
      const handleUpload2 = () => {
        console.log("Uploading Image 2...");
        // Code to upload Image 2 goes here
      };






    return (

        <IconContext.Provider value={{ color: '#a9b3c1', size: '1rem' }}>
            <Particle2 />
            <FaceSection id="Face">

                <FaceWrapper>
                    <Heading >Voter ID</Heading>
                    <br />

                    <FaceContainer>
                        <FaceCard >
                            <FaceCardInfo>
                                <div className='divv'>
                                    <FaceCardCost>FRONT</FaceCardCost>
                                                                       
                                    <div>
                                        <h2>Upload Image 1</h2>
                                        <input type="file" onChange={handleImage1Change} />
                                        <button onClick={handleUpload1}>Upload</button>
                                        {image1 && <img src={URL.createObjectURL(image1)} alt="Image 1" style={{ maxWidth: "300px", maxHeight: "300px" }} />}
                                    </div>

                                </div>
                                
                            </FaceCardInfo>
                        </FaceCard>
                        {/* back */}
                        <FaceCard >
                            <FaceCardInfo>
                                <div className='divv'>
                                    <FaceCardCost>BACK</FaceCardCost>

                                    <div>
                                        <h2>Upload Image 2</h2>
                                        <input type="file" onChange={handleImage2Change} />
                                        <button onClick={handleUpload2}>Upload</button>
                                        {image2 && <img src={URL.createObjectURL(image2)} alt="Image 2" style={{ maxWidth: "300px", maxHeight: "300px" }} />}
                                    </div>
                                </div>
                            </FaceCardInfo>
                        </FaceCard>
                    </FaceContainer>
                    <br />




















                    <br />
                    <br /> <br /> <br />
                     

                <Link to="/adhar">

                <div className='btn-div'>

                <button class="btn-17">
                    <span class="text-container">
                    <span class="text">Proceed</span>
                    </span>
                </button>


                                        
                </div>
                </Link> 
                </FaceWrapper>


            </FaceSection>

        </IconContext.Provider>
        

    );
}
export default Voter;





































