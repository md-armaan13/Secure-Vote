import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormSection,
  FormRow,
  FormLabel,
  FormInputRow,
  FormMessage,
  FormButton,
  FormTitle,
} from "./HowToVoteStyle";
import { Link } from "react-router-dom";
import "./button68.css";

import { Container } from "../../globalStyles";
// import validateForm from './validateForm';
import Particle from "../Particle";

const HowToVote = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let history = useNavigate();

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  // const formData = [
  // 	{ label: 'Name', value: name, onChange: (e) => setName(e.target.value), type: 'text' },
  // 	{ label: 'Email', value: email, onChange: (e) => setEmail(e.target.value), type: 'email' },
  // 	{
  // 		label: 'Password',
  // 		value: password,
  // 		onChange: (e) => setPassword(e.target.value),
  // 		type: 'password',
  // 	},
  // 	{
  // 		label: 'Confirm Password',
  // 		value: confirmPass,
  // 		onChange: (e) => setConfirmPass(e.target.value),
  // 		type: 'password',
  // 	},
  // ];

  return (
    <FormSection method="POST">
      <Particle />
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>How To Vote</FormTitle>
            <FormWrapper>
              <p>
                <ul>
                  {" "}
                  To cast your valuable vote you have to follow the below listed
                  steps:
                  <br />
                  <br />
                  <br />
                  <li > On the landing page click on VOTE HERE </li >
                  <br />
                  <li >
                  A window appears that asks for your voter id verification
                  appears. Upload the photos of your voter id card so that
                  verification can be done </li>
				  <br />
                  <br />
                  <li >
                  After completing the voter id verification, click on PROCEED.
                  A new window for Aadhar card verification appears, upload the
                  photos of your aadhar card for verification </li>
                  <br />
                  <br />
                  <li >
                  When the aadhar card is verified, click on PROCEED after which
                  a window will appear for face detection. Allow your camera and
                  click a photograph of yours.
				  </li>
                  <br />
                  <br />
                  <li >
                  The photograph will be matched with the existing database and
                  after clicking PROCEED you would be allowed to vote A screen
                  showing the information of the parties will appear, on which
                  you can cast your vote and claim your NFT.
				  </li>
                  <br />
                  <br />
                </ul>
              </p>
              {/* {formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))} */}

              <Link to="/voterId">
                <button class="btn-17">Next</button>
              </Link>
            </FormWrapper>
            {error && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
                error
              >
                {error}
              </FormMessage>
            )}
            {success && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
              >
                {success}
              </FormMessage>
            )}
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
};

export default HowToVote;
