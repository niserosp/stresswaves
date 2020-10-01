import * as d3 from 'd3-shape'
import _ from 'lodash'
import React from 'react'
import { animated, useSpring } from 'react-spring'
import { ClipState } from '../../../../audio/clips'
import { useLoadingOpacity } from './hooks'

export default (props: { state: ClipState, hover?: boolean }) => {
    const opacity = useLoadingOpacity(props.state)

    return (
        <animated.svg width='1em' height='1em' viewBox='-1 -1 2 2' opacity={opacity}>
            <SprungSine moving={props.state.status === 'playing' || (props.hover && props.state.status !== 'loading')} />
        </animated.svg>
    )
}

function SprungSine(props: { moving?: boolean }) {
    const { speed } = useSpring({
        from: { speed: 0 },
        speed: props.moving ? 0.001 : 0,
    })

    return <AnimatedSine speed={speed} />
}

const AnimatedSine = animated(Sine)

function Sine(props: { speed: number }) {
    const points = useSinePoints(props.speed)

    return <animated.path d={points.to(naturalPathDataFromPoints)} fill='none' strokeWidth='0.003em' stroke='white' />
}

function useSinePoints(speed: number) {
    const { x } = useSpring({
        from: { x: 0 },
        to: { x: speed ? 2 : 0 },
        loop: true,
        config: {
            duration: speed ? 1000 / (speed * 1000) : undefined
        }
    })

    return x.to(x => [sinePoints(x, 0.1)])
}


function sinePoints(startX: number, step: number) {
    const xs = _.range(startX, startX + 2, step)
    const ys = xs.map(x => Math.sin(x * 3.14159) / 2)

    return ys.map((y, index) => [index * step - 1, y]) as [number, number][]
}

function naturalPathDataFromPoints(points: [number, number][]) {
    return d3.line().curve(d3.curveNatural)(points) as string
}
