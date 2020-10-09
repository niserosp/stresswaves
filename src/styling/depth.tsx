import { ComponentType } from 'react';
import styled from 'styled-components';

// prettier-ignore
export function depthStyling<P>(component: ComponentType<P>) {
	return (
		styled(component)<P & { depth: number }>
			`  filter: hue-rotate(${(props) => -props.depth * 4}deg) brightness(${(props) => props.depth * 4 + 100}%) blur(${(
				props
			) => (props.depth < 0 ? Math.abs(props.depth / 5) : 0)}px);
      transform: translateZ(${(props) => props.depth * 10}px);
      transform-style: preserve-3d;
    `
	);
}
