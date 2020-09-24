import { Box } from 'grommet'
import React, { Suspense, useState } from 'react'
import { useHover } from 'react-use-gesture'
import ConstructionTextAnimation from './animations/ConstructionTextAnimation'
import CenterBox from './CenterBox'
import { CircleLoader } from 'react-spinners'

const LazyWaves = React.lazy(() => import('./animations/svgElementAnimations/WavesAnimation'))
const LazyEmojis = React.lazy(() => import('./animations/svgElementAnimations/EmojiAnimation'))

export default function () {
    const [hovering, hoverBindings] = useHovering()

    const constructionTextStyle = displayHidden(hovering)

    return (
        <CenterBox>
            <Box width='large' height='medium' align='center' justify='center' as='main' {...hoverBindings()}>
                <Suspense fallback={<CircleLoader color='white' />}>
                    <svg viewBox='-25 -75 200 200' transform='matrix(1, 0.2, 0.2, 1, 0, 0)'>
                        <LazyWaves pullApart={hovering} />
                        <g transform='translate(4, -18)'>
                            <LazyEmojis active={hovering} />
                        </g>
                    </svg>
                    <ConstructionTextAnimation style={constructionTextStyle} />
                </Suspense>
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