import articlesUnsorted from './articles.json';
import { sortBy, last } from 'ramda';

const sortByUnixDate = (articles_: typeof articlesUnsorted) => {
	return sortBy((article) => article.unixDate, articles_);
};

export const articles = sortByUnixDate(articlesUnsorted);

export const latestArticle = () => {
	return last(articles);
};
