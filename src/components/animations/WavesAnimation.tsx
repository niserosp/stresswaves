import { scaleLinear } from 'd3-scale'
import * as d3 from 'd3-shape'
import { Box } from 'grommet'
import _ from 'lodash'
import React from 'react'
import { animated, config, useTrail } from 'react-spring'
import useInterval from 'react-useinterval'

export default function () {
    const trail = useWavesAnimation()
    return (
        <svg viewBox='0 0 200 200'>
            {trail.map(({ d }, index) => {
                const [x, y] = [25 + index * 3, 50 - index * 3]
                return (
                    <animated.path
                        transform={`matrix(1, 0.2, -0.2, 1, ${x}, ${y})`}
                        d={d}
                        style={{ fill: 'none', stroke: '#FFF', strokeMiterlimit: 10 }}
                    />
                )
            })}
        </svg>
    )
}

function useWavesAnimation() {
    const [trail, setSpring] = useTrail<{ d: string }>(6, () => ({
        d: randomWave(),
        config: { native: true, velocity: 100, ...config.stiff }
    }))

    useInterval(() => { setSpring({ d: randomWave() }) }, 200)

    return trail
}

function randomWave(): string {
    const yPoints = [0, 0].concat(randomPoints(12)).concat([0, 0])

    // usage of `as`: guaranteed to be that type after call to `reject`
    let data = _.reject(_.zip(_.range(16), yPoints), d => _.some(d, _.isUndefined)) as [number, number][]
    const yScale = scaleLinear().domain([-1, 1]).range([-25, 25])
    const xScale = scaleLinear().domain([-10, 10]).range([-100, 100])
    data = data.map(([x, y]) => [xScale(x), yScale(y)])

    // usage of `!`: guaranteed to be non-null
    return d3.line().curve(d3.curveBasis)(data)!
}

function randomPoints(n: number): number[] {
    return new Array(n).fill(null).map(() => _.random(-1, 1))
}