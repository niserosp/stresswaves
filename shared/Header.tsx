import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import { latestArticle } from './articles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Header() {
	return (
		<React.Fragment>
			<header id={styles.header}>
				<Logo />
				<Nav />
			</header>
			<AboutLink />
		</React.Fragment>
	);
}

const Logo = () => {
	return (
		<div id={styles.logo}>
			<Link href="/">
				<Image src="/logo.svg" alt="logo" width={19.5} height={66} />
			</Link>
		</div>
	);
};

const Nav = () => {
	return (
		<nav id={styles.nav}>
			<Link href={`/articles/${latestArticle().route}`}>Latest</Link>
			<span>·</span>
			<Link href="/articles">Articles</Link>
		</nav>
	);
};

const AboutLink = () => {
	const router = useRouter();

	const motionVariants = {
		full: { filter: 'saturate(1000%)' },
		normal: { filter: 'saturate(100%)' }
	};

	return (
		<div id={styles.about}>
			<Link href="/about">
				<motion.div
					variants={motionVariants}
					animate={router.asPath === '/about' ? 'full' : 'normal'}
					whileHover={'full'}
					initial={'normal'}
					transition={{ duration: 1 }}
				>
					<Image src="/squares.png" alt="about" width={100} height={100} />
				</motion.div>
			</Link>
		</div>
	);
};
