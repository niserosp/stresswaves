import React, { useEffect } from 'react'
import { animated, config, InterpolationConfig, useSpring } from 'react-spring'
import * as d3 from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import _ from 'lodash'
import useInterval from 'react-useinterval'

export default function () {
    const d = useWavesAnimation()
    return <svg viewBox='0 0 200 200'><animated.path transform='translate(50, 100)' d={d} style={{ fill: 'none', stroke: '#FFF', strokeMiterlimit: 10 }} /></svg>
}

function useWavesAnimation() {
    const [{ pathData }, setSpring] = useSpring(() => ({
        pathData: randomWave(),
        config: { native: true, ...config.molasses }
    }))

    useInterval(() => { setSpring({ pathData: randomWave() }) }, 200)

    return pathData
}

function randomWave(): string {
    const yPoints = [0, 0].concat(randomPoints(12)).concat([0, 0])

    // usage of `as`: guaranteed to be that type after call to `reject`
    let data = _.reject(_.zip(_.range(16), yPoints), d => _.some(d, _.isUndefined)) as [number, number][]
    const yScale = scaleLinear().domain([-1, 1]).range([-50, 50])
    const xScale = scaleLinear().domain([-10, 10]).range([-100, 100])
    data = data.map(([x, y]) => [xScale(x), yScale(y)])

    // usage of `!`: guaranteed to be non-null
    return d3.line().curve(d3.curveBasis)(data)!
}

function randomPoints(n: number): number[] {
    return new Array(n).fill(null).map(() => _.random(-1, 1))
}