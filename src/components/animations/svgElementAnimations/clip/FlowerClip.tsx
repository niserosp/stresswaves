import React from 'react'
import { animated } from 'react-spring';
import { ClipState } from '../../../../audio/clips';
import { RandomFlowers } from '../Flowers';
import { useLoadingOpacity } from './hooks';

export function FlowerClip(props: { state: ClipState, hovering?: boolean }) {
    const opacity = useLoadingOpacity(props.state)

    return (
        <animated.svg width='3em' viewBox='-1 -1 3 3' opacity={opacity}>
            <RandomFlowers blooms={3} active={(props.state.status !== 'loading' && props.hovering) || props.state.status === 'playing'} />
        </animated.svg>
    )
}