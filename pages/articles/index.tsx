import Link from 'next/link';
import React from 'react';
import { articles } from '../../shared/articles';
import Main from '../../shared/Main';
import styles from './index.module.css';
import { format, fromUnixTime } from 'date-fns';

export default function Articles() {
	return (
		<Main>
			{articles.map((article) => {
				return (
					<Link key={article.route} href={`/articles/${article.route}`}>
						<div className={styles.linkInnerDiv}>
							<span className={styles.name}>{article.name}</span>
							<span className={styles.date}>{displayDate(article.unixDate)}</span>
						</div>
					</Link>
				);
			})}
		</Main>
	);
}

const displayDate = (unixDate: number): string => {
	const date = fromUnixTime(unixDate);
	return format(date, 'dd/MM/yy');
};
