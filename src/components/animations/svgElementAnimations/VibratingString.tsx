import { curveCardinal, line } from 'd3-shape'
import { interval, timer } from 'd3-timer'
import _ from 'lodash'
import * as math from 'mathjs'
import { ArrayNodeDependencies, sin } from 'mathjs'
import React, { useEffect, useState } from 'react'
import { angleAt, bisectingAngle, interpolateCurve, Point, Points, vector, vectorFromTo } from '../../../lib/geometry'

export default function VibratingStrings() {
    return (
        <g>
            <VibratingString />
            <VibratingString />
            <VibratingString />
            <VibratingString />
            <VibratingString />
            <VibratingString />
        </g>
    )
}

function VibratingString() {
    const [t, setTime] = useState(0)
    useEffect(() => {
        timer(setTime)
    }, [setTime])
    const pathPoints: Points = [[0, -1], [-1, 0], [0, 1], [1, 0], [0, -1]]
    const offsets = _.range(20).map((_x, i) => sin(i * 4 + t / 500) / 16)
    const offsetPoints = applyOffsets(offsets, pathPoints)

    return <path d={pathData(offsetPoints)} />
}

function applyOffsets(offsets: number[], points: Points) {
    const controlPoints = interpolateCurve(points)

    const crossAxisAngles = controlPoints.map(
        (_point: Point, index: number) => {
            return crossAxisAngle(index, controlPoints)
        }
    )
    console.log(crossAxisAngles)

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