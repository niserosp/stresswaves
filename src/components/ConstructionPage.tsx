import { Box, Main, Stack } from 'grommet'
import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import CenterBox from './CenterBox'
import ConstructionTextAnimation from './animations/ConstructionTextAnimation'
import WavesAnimation from './animations/WavesAnimation'

export default function () {
    return (
        <CenterBox>
            <StyledMain align='center' as='main'>
                <WavesAnimation />
                <ConstructionTextAnimation />
            </StyledMain>
        </CenterBox>
    )
}

const StyledMain = styled(Box) <ComponentProps<typeof Box>>`
  min-width: 75vw;
  min-height: 40vh;
`