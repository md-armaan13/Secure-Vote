import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
} from './HowToVoteStyle';
import { Link } from 'react-router-dom';
import './button68.css';

import { Container } from '../../globalStyles';
// import validateForm from './validateForm';
import Particle from '../Particle';

const HowToVote = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
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
		
		<FormSection method ="POST">
			<Particle/>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>How To Vote</FormTitle>
						<FormWrapper >
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

                            <button class="btn-68">Next</button>

                             

                            
						
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
