import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';

const iconStyle = (Icon) => <Icon />;

export const footerSocialData = [
	{
		name: 'Facebook',
		icon: iconStyle(FaFacebook),
	},
	{
		name: 'Instagram',
		icon: iconStyle(FaInstagram),
	},
	{
		name: 'YouTube',
		icon: iconStyle(FaYoutube),
	},
	{
		name: 'Twitter',
		icon: iconStyle(FaTwitter),
	},
	{
		name: 'LinkedIn',
		icon: iconStyle(FaLinkedin),
	},
];

export const footerData = [

	{
		title: 'Developers',
		links: ['Aashish Gupta', 'Armaan Ansari', 'Divyanshu', 'Sion ','Ayushi'],
	},
	{
		title: 'T & C',
		links: ['Privacy Policy', 'Terms of Service', 'Disclaimer'],
	},
];
