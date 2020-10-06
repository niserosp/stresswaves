import { pi } from "mathjs"
import { crossAxisAngle } from "./VibratingString"
import * as fc from 'fast-check'
import { arbitraryLineSegment } from "../../../lib/geometry.test"
import { angleFromX, vectorFromTo } from "../../../lib/geometry"

describe('cross axis angle properties', () => {
    it('is never negative', () => {
        fc.assert(fc.property(arbitraryLineSegment(), segment => crossAxisAngle(1, segment) >= 0))
    })

    it('is always larger than the smallest angle', () => {
        fc.assert(fc.property(arbitraryLineSegment(), segment => {
            const a1 = angleFromX(vectorFromTo(segment[1], segment[0]))
            const a2 = angleFromX(vectorFromTo(segment[1], segment[2]))

            const smallestAngle = a1 > a2 ? a2 : a1
            expect(crossAxisAngle(1, segment)).toBeGreaterThan(smallestAngle)
        }))
    })
})