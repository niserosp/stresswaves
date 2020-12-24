import React from 'react';
import Main from '../shared/Main';
import { chooseRandom } from '../shared/random';
import { Title, Text } from '../shared/typography';

export default function About() {
	return (
		<Main>
			<Title>About</Title>
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
