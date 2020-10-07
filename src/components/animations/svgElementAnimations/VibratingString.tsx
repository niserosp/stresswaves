import { interpolateBasis, quantize } from 'd3-interpolate'
import { curveCardinal, line } from 'd3-shape'
import produce from 'immer'
import _, { round, toInteger } from 'lodash'
import * as math from 'mathjs'
import { sin } from 'mathjs'
import React from 'react'
import { animated, Interpolation, SpringValue, to, useSpring } from 'react-spring'
import { bisectingAngle, interpolateCurve, Point, Points, vector, vectorFromTo } from '../../../lib/geometry'

export default function VibratingStrings() {
    return (
        <g>
            <VibratingString points={[[-1, 0], [1, 0]]} density={20} />
        </g>
    )
}

function VibratingString(props: { points: Points, density: number }) {
    const offsets = useVibratingOffsets(props.density)

    return <FluctuatedCurve controlPoints={props.points} offsets={offsets as any} />
}

const FluctuatedCurve = animated((props: { controlPoints: Points, offsets: number[] }) => {
    const offsetPoints = applyOffsets(props.offsets, props.controlPoints)
    return <path d={pathData(offsetPoints)} />
})

function useVibratingOffsets(n: number) {
    const centerOfMass = useMovingCenterOfMass(n)
    return useVibrationsAroundCenter(n, centerOfMass)
}

function useMovingCenterOfMass(n: number) {
    const { center } = useSpring({
        from: { center: -10 },
        to: { center: n - 1 },
        loop: true,
        config: { mass: 20, tension: 50, clamp: true }
    })

    return center
}

function useVibrationsAroundCenter(n: number, center: SpringValue<number>): Interpolation<number[], number[]> {
    const waveOffsets = useWave(n)
    return to([waveOffsets, center] as [typeof waveOffsets, typeof center], (waveOffsets, center) => applyAmplitudeCurve(center, waveOffsets))
}

function useWave(n: number) {
    const { x } = useSpring({
        from: { x: 0 },
        to: { x: 2 },
        loop: true,
        config: { duration: 3000 }
    })

    return x.to(x => _.range(0, n).map(y => sin(x + y) / 16))
}

function applyAmplitudeCurve(center: number, offsets: number[]) {
    const curve = amplitudeCurve(center, offsets.length)
    const curveValue = (index: number) => {
        return curve((index - center) / 10)
    }
    return offsets.map((offset, index) => offset * curveValue(index))
}

function amplitudeCurve(center: number, size: number) {
    return interpolateBasis([0, 1, 0])
}

function applyOffsets(offsets: number[], points: Points) {
    const controlPoints = interpolateCurve(points)

    const crossAxisAngles = controlPoints.map(
        (_point: Point, index: number) => {
            return crossAxisAngle(index, controlPoints)
        }
    )

    const applyOffset = (point: Point, offset: number, offsetAngle: number) => {
        const offsetVector = vector(offsetAngle, offset)
        return math.add(offsetVector, point) as Point
    }

    return _.zipWith(controlPoints, offsets, crossAxisAngles, applyOffset)
}

function neighborhood<T>(index: number, array: T[]): [T, T, T] {
    const [x, y, z] = [array[index - 1], array[index], array[index + 1]]

    return [x, y, z]
}

export const crossAxisAngle = (index: number, points: Points) => {
    let [before, point, after] = neighborhood(index, points)
    if (!before) before = math.subtract(point, after) as Point
    if (!after) after = math.subtract(point, before) as Point

    const [toBeforeV, toAfterV] = angleVectors(before, point, after)
    return bisectingAngle(toBeforeV, toAfterV)
}

function angleVectors(before: Point, point: Point, after: Point): [Point, Point] {
    return [vectorFromTo(point, before), vectorFromTo(point, after)]
}

function pathData(points: [number, number][]): string | undefined {
    return line().curve(curveCardinal)(points) || undefined
}