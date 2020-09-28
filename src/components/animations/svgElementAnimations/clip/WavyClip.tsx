import { scaleLinear } from 'd3-scale'
import * as d3 from 'd3-shape'
import { interval } from 'd3-timer'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
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
        speed: props.moving ? 0.005 : 0,
    })

    return <AnimatedSine speed={speed} />
}

const AnimatedSine = animated(Sine)

function Sine(props: { speed: number }) {
    const [{ x }, setSpring] = useSpring(() => ({
        x: 0,
        config: { immediate: true, native: true }
    }))

    const sineMover = useRef(new SineMover(0, 2)).current

    useEffect(() => {
        const animation = interval((elapsed: number) => {
            const dt = 17
            const nextX = sineMover.next(dt, props.speed)
            setSpring({ x: nextX })
        }, 17)

        return () => animation.stop()
    }, [setSpring, props.speed, sineMover])

    return <animated.path d={x.interpolate(sinePathData)} fill='none' strokeWidth='0.003em' stroke='white' />
}

class SineMover {
    private readonly cycleLength: number
    private x: number

    constructor(startX: number, cycleLength: number) {
        this.cycleLength = cycleLength
        this.x = startX
    }

    next(deltaTime: number, speed: number): number {
        const moveScale = scaleLinear().domain([0, 1000 / (speed * 1000)]).range([0, this.cycleLength])

        const nextX = this.x + (speed ? moveScale(deltaTime) : 0)
        this.x = nextX

        return nextX
    }
}

function sinePathData(x: number) {
    const points = sinePoints(x)
    const pathData = pathDataFromPoints(points)

    return pathData
}

function sinePoints(startX: number) {
    const stepSize = 0.1
    const xs = _.range(startX, startX + 2, stepSize)
    const ys = xs.map(x => Math.sin(x * 3.14159) / 2)

    return ys.map((y, index) => [index * stepSize - 1, y]) as [number, number][]
}

function pathDataFromPoints(points: [number, number][]) {
    return d3.line().curve(d3.curveBasis)(points) as string
}

function useLoadingOpacity(clipState: ClipState) {
    const active = clipState.status === 'loading'

    const [targetOpacity, setTargetOpacity] = useState(1)

    useEffect(() => {
        active ? setTargetOpacity(0.5) : setTargetOpacity(1)
    }, [active, setTargetOpacity])

    const toggleOpacity = () => setTargetOpacity(targetOpacity === 0.4 ? 0.75 : 0.4)

    const { opacity } = useSpring({
        opacity: targetOpacity,
        onRest: () => { if (active) toggleOpacity() },
        config: config.stiff
    })

    return opacity
}