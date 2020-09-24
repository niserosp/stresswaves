import { Box } from 'grommet'
import React, { useState } from 'react'
import { useHover } from 'react-use-gesture'
import { mergeBindings } from '../lib/bindings'
import ConstructionTextAnimation from './animations/ConstructionTextAnimation'
import useEmojiAnimation from './animations/svgElementAnimations/EmojiAnimation'
import useWavesAnimation from './animations/svgElementAnimations/WavesAnimation'
import CenterBox from './CenterBox'

export default function () {
    const [Waves, waveHoverBindings] = useWavesAnimation()
    const [EmojiShelves, setEmojiShelvesActive] = useEmojiAnimation()
    const emojiHoverBindings = useEmojisOnHover(setEmojiShelvesActive)
    const [constructionTextStyle, textBindings] = useHideTextOnHover()
    const bindings = mergeBindings(waveHoverBindings(), emojiHoverBindings(), textBindings())

    return (
        <CenterBox>
            <Box width='large' height='medium' align='center' as='main' {...bindings}>
                <svg viewBox='-25 -75 200 200' transform='matrix(1, 0.2, 0.2, 1, 0, 0)'>
                    <Waves />
                    <g transform='translate(4, -18)'>
                        <EmojiShelves />
                    </g>
                </svg>
                <ConstructionTextAnimation style={constructionTextStyle} />
            </Box>
        </CenterBox>
    )
}

function useEmojisOnHover(setEmojiShelvesActive: (active: boolean) => void) {
    return useHover(state => setEmojiShelvesActive(state.hovering))
}

function useHideTextOnHover() {
    const [style, setStyle] = useState({})
    const bindings = useHover(state => setStyle(state.hovering ? { display: 'none' } : {}))

    return [style, bindings] as [typeof style, typeof bindings]
}