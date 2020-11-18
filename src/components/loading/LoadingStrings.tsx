import { createSlice } from '@reduxjs/toolkit';
import { Box, Stack } from 'grommet';
import React, { ComponentProps, createContext, ReactNode, Suspense, useContext, useEffect, useReducer } from 'react';
import { animated, useSpring } from 'react-spring';
import { depthStyling } from '../../styling/depth';
import VibratingStrings from '../animations/svgElementAnimations/VibratingString';

const LoadingContext = createContext((action: any) => {});

const loadingSlice = createSlice({
	name: 'loading',
	initialState: 0,
	reducers: {
		loading: (state) => state + 1,
		done: (state) => state - 1
	}
});

export default function LoadingStrings(props: { children?: ReactNode }) {
	const [ loadingCount, dispatch ] = useReducer(loadingSlice.reducer, 0);

	return (
		<LoadingContext.Provider value={dispatch}>
			<Stack fill>
				<AnimatedDepthStyledSVG
					depth={loadingCount ? -2 : -6}
					width="100%"
					height="100%"
					stroke="#76B7B6"
					viewBox="-0.9 -0.9 1.8 1.8"
					strokeWidth="0.001"
					fill="none"
					preserveAspectRatio="none"
				>
					<VibratingStrings moving={Boolean(loadingCount)} />
				</AnimatedDepthStyledSVG>
				<Box fill>{props.children}</Box>
			</Stack>
		</LoadingContext.Provider>
	);
}

export function LoadingSuspense(props: { children?: ReactNode }) {
	const dispatch = useContext(LoadingContext);

	const Fallback = () => {
		useEffect(() => {
			dispatch(loadingSlice.actions.loading);

			return () => dispatch(loadingSlice.actions.done);
		});

		return null;
	};

	return <Suspense fallback={<Fallback />}>{props.children}</Suspense>;
}

const DepthStyledSVG = depthStyling((props: ComponentProps<'svg'>) => <svg {...props} />) as any;

const AnimatedDepthStyledSVG = ({ depth, ...props }: ComponentProps<typeof DepthStyledSVG>) => {
	const spring = useSpring({
		from: { depth: 0 },
		to: { depth }
	});

	return <WrappedDepthStyledSVG depth={spring.depth} {...props} />;
};

const WrappedDepthStyledSVG = animated(({ depth, ...props }: ComponentProps<typeof DepthStyledSVG>) => (
	<DepthStyledSVG depth={depth} {...props} />
));
