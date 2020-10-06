import fc, { Arbitrary } from "fast-check"
import { pi } from "mathjs"
import { angle, angleBetweenVectors, angleFromX, bisectingAngle, Point, vector, vectorFromTo } from "./geometry"

export const arbitraryPoint = () => fc.tuple(fc.integer(), fc.integer())
export const arbitraryLineSegment = () => fc.tuple(arbitraryPoint(), arbitraryPoint(), arbitraryPoint())

describe('Getting control point angles', () => {
    describe('When a straight line segment is passed in', () => {
        it('then the angle is PI', () => {
            const straightPoints = [[0, 0], [1, 0], [2, 0]] as [Point, Point, Point]
            expect(angle(...straightPoints)).toBeCloseTo(Math.PI)
        })
    })

    describe('When a right angled segment is passed in', () => {
        it('we get a right angle', () => {
            expect(angle([0, 0], [1, 0], [1, 1])).toBeCloseTo(Math.PI / 2)
        })
    })
})

describe('Distance vectors between points', () => {
    describe('When points are equal on an axis', () => {
        it('then that axis is equal in the resulting vector', () => {
            expect(vectorFromTo([0, 0], [1, 0])[1]).toEqual(0)
            expect(vectorFromTo([0, 0], [0, 1])[0]).toEqual(0)
        })
    })

    describe('When from point is zero', () => {
        it('then the distance function is the identity for the other point', () => {
            expect(vectorFromTo([0, 0], [12, 9])).toEqual([12, 9])
        })
    })

    describe('When to point is zero', () => {
        it('then the distance vector is the negative of the from point', () => {
            expect(vectorFromTo([10, -1], [0, 0])).toEqual([-10, 1])
        })
    })
})

describe('Creating a vector with polar coordinates', () => {
    describe('When created with an angle of 0 and magnitude 1', () => {
        it('then we get unit X', () => {
            expect(vector(0, 1)).toEqual([1, 0])
        })
    })

    describe('When created with an angle of PI and magnitude 2', () => {
        it('then we get negative unit X multiplied by 2', () => {
            const result = vector(Math.PI, 2)
            expect(result[0]).toBeCloseTo(-2)
            expect(result[1]).toBeCloseTo(0)
        })
    })
})

describe('angle between vectors', () => {
    describe('when taking the angle between unit Y and unit X', () => {
        it('then the angle is 1/2PI', () => {
            expect(angleBetweenVectors([1, 0], [0, 1])).toBeCloseTo(pi / 2)
        })
    })

    describe('properties', () => {
        it('is never negative', () => {
            fc.assert(fc.property(arbitraryPoint(), arbitraryPoint(), (v1, v2) => angleBetweenVectors(v1, v2) >= 0))
        })
    })
})

describe('bisecting angle', () => {
    describe('properties', () => {
        it('is never negative', () => {
            fc.assert(fc.property(arbitraryPoint(), arbitraryPoint(), (v1, v2) => expect(bisectingAngle(v1, v2)).toBeGreaterThanOrEqual(0)))
        })
    })
})

describe('angle from x', () => {
    describe('properties', () => {
        it('is never negative', () => {
            fc.assert(fc.property(arbitraryPoint(), v => expect(angleFromX(v)).toBeGreaterThanOrEqual(0)))
        })
    })
})