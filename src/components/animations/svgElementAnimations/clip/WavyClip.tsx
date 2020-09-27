import { scaleLinear } from 'd3-scale'
import * as d3 from 'd3-shape'
import { timer } from 'd3-timer'
import _ from 'lodash'
import React, { useEffect, useRef } from 'react'
import { animated, config, useSpring } from 'react-spring'
import { ClipState } from '../../../../audio/clips'

export default (props: { state: ClipState, hover?: boolean }) => {
    return (
        <svg width='1em' height='1em' viewBox='-1 -1 2 2'>
            <SprungSine moving={props.hover} />
        </svg>
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

    const ref = useRef({ x: 0 })

    useEffect(() => {
        let lastTime = null as null | number
        const cycleLength = 2
        const moveScale = scaleLinear().domain([0, 1000 / (props.speed * 1000)]).range([0, cycleLength])

        const animation = timer((elapsed: number) => {
            const dt = lastTime ? elapsed - lastTime : 0
            const nextX = ref.current.x + (props.speed ? moveScale(dt) : 0)

            setSpring({ x: nextX })

            ref.current = { x: nextX }
            lastTime = elapsed
        })

        return () => animation.stop()
    }, [setSpring, props.speed])

    return <animated.path d={x.interpolate(sinePathData)} fill='none' strokeWidth='0.003em' stroke='white' />
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