import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import { latestArticle } from './articles';

export default function Header() {
	return (
		<div id={styles.header}>
			<Logo />
			<Nav />
		</div>
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
