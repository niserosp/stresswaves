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
			<span>·</span>
			<Link href="/about">About</Link>
		</nav>
	);
};
