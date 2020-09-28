import * as d3 from 'd3-shape'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { animated, config, useSpring } from 'react-spring'
import { ClipState } from '../../../../audio/clips'

export default (props: { state: ClipState, hover?: boolean }) => {
    const opacity = useLoadingOpacity(props.state)

    return (
        <animated.svg width='1em' height='1em' viewBox='-1 -1 2 2' opacity={opacity}>
            <SprungSine moving={props.state.status === 'playing' || props.hover} />
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

    return <animated.path d={points.to(points => naturalPathDataFromPoints(points))} fill='none' strokeWidth='0.003em' stroke='white' />
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

function stepPathDataFromPoints(points: [number, number][]) {
    return d3.line().curve(d3.curveStep)(points) as string
}

function useLoadingOpacity(clipState: ClipState) {
    const active = clipState.status === 'loading'

    const [{ opacity }, setSpring] = useSpring(() => ({
        from: { opacity: 0.75 },
        config: config.stiff
    }))

    useEffect(() => {
        if (active) {
            setSpring({
                to: [{ opacity: 0.4 }, { opacity: 0.75 }],
                loop: true
            })
        } else {
            setSpring({})
        }
    }, [active, setSpring])

    return opacity
}