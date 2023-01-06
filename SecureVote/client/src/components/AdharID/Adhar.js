import React, { useState } from 'react';
import { Heading } from '../../globalStyles';
import { IconContext } from 'react-icons/lib';
import './AdharStyle';
import './Adhar.css';

import { Link } from 'react-router-dom';
import UploadImg from './Untitled.jpeg'

import {
    FaceSection,
    FaceWrapper,
    FaceContainer,
    FaceCardInfo,
    FaceCard,
    FaceCardCost,
} from './AdharStyle';

import Particle2 from '../Particle2';


function Adhar() {
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
    const onSubmit = (e) => {
        e.preventDefault();
        alert(URL.createObjectURL(image));
    }

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

                        <FaceCard >
                            <FaceCardInfo>
                                <p>Back</p>
                            </FaceCardInfo>
                        </FaceCard>
                    </FaceContainer>
                    <br />
                    <br />

                </FaceWrapper>

                <Link to="/face">
                <div className='btn-div'>
                    <button className="btn-17">
                        <span className="text-container">
                            <span className="text">Proceed</span>
                        </span>
                    </button>
                </div>

                </Link>

            </FaceSection>

        </IconContext.Provider>


    );
}
export default Adhar;
