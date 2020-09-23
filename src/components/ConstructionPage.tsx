import { Box } from 'grommet'
import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import ConstructionTextAnimation from './animations/ConstructionTextAnimation'
import WavesAnimation from './animations/WavesAnimation'
import CenterBox from './CenterBox'

export default function () {
    return (
        <CenterBox>
            <Box width='large' height='medium' align='center' as='main'>
                <WavesAnimation />
                <ConstructionTextAnimation />
            </Box>
        </CenterBox>
    )
}