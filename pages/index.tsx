import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react';
import { latestArticle } from '../shared/articles';

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		router.push(`/articles/${latestArticle().route}`);
	});

	return null;
}
