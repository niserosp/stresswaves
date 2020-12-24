import React, { ReactNode } from 'react';
import styles from './typography.module.css';

export const Title = (props: { children?: ReactNode }) => {
	return <h1 className={styles.title}>{props.children}</h1>;
};

export const SubHeading = (props: { children?: ReactNode }) => {
	return <h2 className={styles.subHeading}>{props.children}</h2>;
};

export const Text = (props: { children?: ReactNode }) => {
	return <p className={styles.text}>{props.children}</p>;
};
