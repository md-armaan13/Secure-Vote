import styled from 'styled-components';

export const FaceSection = styled.div`
	padding: 160px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #101522;
	
	
`;
export const FaceWrapper = styled.div`
	display: flex;
	
	flex-direction: column;
	align-items: center;
	margin: 0 auto;

	@media screen and (max-width: 960px) {
		margin: 0 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

export const FaceContainer = styled.div`
	display: flex;
	
	justify-content: center;
	flex-flow: wrap;
	> div {
		margin: 0.7rem;
	}

	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		> div {
			width: 90%;
		}
	}
`;

export const FaceCard = styled.div`
	&:hover {
		transform: scale(1.06);
		transition: all 0.3s ease-out;
	}
`;

export const FaceCardInfo = styled.div`
	
	background: #242424;
	box-shadow: 0 6px 20px rgba(56, 125, 255, 0.2);
	width: 600px;
	text-decoration: none;
	border-radius: 4px;
	height: 100%;
	opacity: 1;
	display: flex;
	flex-direction: row;
	padding: 24px;
	color: #ffffff;
	
	margin: auto;
	> button {
		margin-top: auto;

		&:hover {
			color: black;
			background: white;
			transition: background 0.3s ease;
		}
	}

	@media screen and (max-width: 768px) {
		width: 90%;

		&:hover {
			transform: none;
		}
	}
`;

export const FaceCardPlan = styled.h3`
	color: #007dfb;
	margin-bottom: 5px;
	font-size: 2.5rem;
`;

export const FaceCardCost = styled.h4`
	font-size: 1.5rem;
`;

export const FaceCardText = styled.p`
	font-size: 1.3rem;
	margin: 0.4rem 0 1.3rem;
	color: #a9b3c1;
	
`;

export const FaceCardFeatures = styled.ul`
	margin: 16px 0 32px;
	list-style: none;
	display: flex;
	flex-direction: column;
	color: #a9b3c1;
	
`;


export const FaceCardFeature = styled.li`
	margin-bottom: 1rem;
	display: flex;
	font-size: 0.94rem;
	&:before {
		content: '🎧';
		margin-right: 0.4rem;
	}
`;
export const Button = styled.button`
	border-radius: 4px;
	background: none;
	white-space: nowrap;
	padding: 10px 20px;
	font-size: 16px;
	color: #fff;
	outline: none;
	border: 2px solid #fff;
	cursor: pointer;
	overflow: hidden;
	position: relative;

	&:before {
		background: #fff;
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
		transition: all 0.6s ease;
		width: 100%;
		height: 0%;
		transform: translate(-50%, -50%) rotate(45deg);
	}

	&:hover:before {
		height: 500%;
	}

	&:hover {
		color: black;
	}
`;