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
    const [image, setImage] = useState();
    let base64code = " ";

    const onChange = (e) => {
        const files = e.target.files
        const file = files[0];
        setImage(e.target.files[0]);

        getbase64(file)
    }

    const onLoad = (fileString) => {
        base64code = fileString
        console.log(fileString)
    }

    const getbase64 = (file) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            onLoad(reader.result);
        }
    }

    const [back, setBack] = useState();
    let base64codeBack = " ";

    const onChangeBack = (event) => {
        const files = event.target.file
        const file = files[0];
        setBack(event.target.files[0]);

        getbase64(file)
    }

    const onLoadBack = (fileString) => {
        base64codeBack = fileString
        console.log(fileString)
    }

    const getbase64Back = (file) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            onLoad(reader.result);
        }
    }
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

                                    <input type="file" id='file' onChange={onChange} />
                                    <label htmlFor='file' className='front'>
                                        <img
                                            src={UploadImg} className="upload" id="change" />
                                    </label>
                                    {image && (
                                        <img className='uploaded'
                                            src={URL.createObjectURL(image)} />
                                    )}
                                </div>
                            </FaceCardInfo>
                        </FaceCard>
                        {/* back */}
                        <FaceCard >
                            <FaceCardInfo>
                                <div className='divv'>
                                    <FaceCardCost>BACK</FaceCardCost>

                                    <input type="file" id='file' onChange={onChangeBack} />
                                    <label htmlFor='file' className='back'>
                                        <img
                                            src={UploadImg} className="upload" id="change" />
                                    </label>
                                    {back && (
                                        <img className='uploaded'
                                            src={URL.createObjectURL(back)} />
                                    )}
                                </div>
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

                <Link to="/adhar">

                <div className='btn-div'>

                <button class="btn-17">
                    <span class="text-container">
                    <span class="text">Proceed</span>
                    </span>
                </button>

                </div>
                </Link> 





            </FaceSection>

        </IconContext.Provider>
        

    );
}
export default Voter;
