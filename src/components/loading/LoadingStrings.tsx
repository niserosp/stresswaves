import { Box } from 'grommet'
import React from 'react'
import VibratingStrings from '../animations/svgElementAnimations/VibratingString'

export default function LoadingStrings() {
    return (
        <Box fill>
            <svg width='100%' height='100%' stroke='white' viewBox='-1 -1 2 2' strokeWidth='0.01' fill='none'>
                <VibratingStrings />
            </svg>
        </Box>
    )
}