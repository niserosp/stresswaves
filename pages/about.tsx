import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import Main from '../shared/Main';
import { chooseRandom } from '../shared/random';
import { Title, Text } from '../shared/typography';
import styles from './about.module.css';

export default function About() {
	return (
		<Main>
			<Title>About</Title>
			<HueRotateFilterAnimation>
				<Image
					width={300}
					height={300}
					className={styles.floatRight}
					src="/hollow-head.png"
					alt="image of stresswaves"
				/>
			</HueRotateFilterAnimation>
			<RandomAboutInfo />
		</Main>
	);
}

const RandomAboutInfo = () => {
	const AboutInfo = chooseRandom(aboutInfoComponents);
	return <AboutInfo />;
};

const LynchianAbout = () => {
	return (
		<React.Fragment>
			<Text>Now, her name is Stresswaves and it is night.</Text>
			<Text>Don't take it any further than that. There's nothin' good about it.</Text>
		</React.Fragment>
	);
};

const FlashAnimationAbout = () => {
	return <Text>Stresswaves is a frame from a 2004 flash animation.</Text>;
};

const aboutInfoComponents = [ LynchianAbout, FlashAnimationAbout ];

const HueRotateFilterAnimation = (props: { children?: ReactNode }) => {
	return (
		<motion.div animate={{ filter: 'hue-rotate(360deg)' }} transition={{ duration: 5, loop: Infinity }}>
			{props.children}
		</motion.div>
	);
};
