import { Box } from 'grommet'
import React, { useState } from 'react'
import { useHover } from 'react-use-gesture'
import ConstructionTextAnimation from './animations/ConstructionTextAnimation'
import Emojis from './animations/svgElementAnimations/EmojiAnimation'
import Waves from './animations/svgElementAnimations/WavesAnimation'
import CenterBox from './CenterBox'

export default function () {
    const [hovering, hoverBindings] = useHovering()

    const constructionTextStyle = displayHidden(hovering)

    return (
        <CenterBox>
            <Box width='large' height='medium' align='center' as='main' {...hoverBindings()}>
                <svg viewBox='-25 -75 200 200' transform='matrix(1, 0.2, 0.2, 1, 0, 0)'>
                    <Waves pullApart={hovering} />
                    <g transform='translate(4, -18)'>
                        <Emojis active={hovering} />
                    </g>
                </svg>
                <ConstructionTextAnimation style={constructionTextStyle} />
            </Box>
        </CenterBox>
    )
}

function useHovering() {
    const [hovering, setHovering] = useState(false)
    const bindings = useHover(state => setHovering(state.hovering))

    return [hovering, bindings] as [typeof hovering, typeof bindings]
}

function displayHidden(hide: boolean) {
    return hide ? { display: 'none' } : {}
}