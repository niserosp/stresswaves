import { ReactNode } from 'react';
import styles from './Main.module.css';

export default function Main(props: { children?: ReactNode }) {
	return <main id={styles.main}>{props.children}</main>;
}
