import { Box } from 'grommet'
import React, { Suspense, useState } from 'react'
import { CircleLoader } from 'react-spinners'
import { useDrag } from 'react-use-gesture'
import ConstructionTextAnimation from './animations/ConstructionTextAnimation'
import CenterBox from './CenterBox'

const LazyWaves = React.lazy(() => import('./animations/svgElementAnimations/WavesAnimation'))
const LazyEmojis = React.lazy(() => import('./animations/svgElementAnimations/EmojiAnimation'))

export default function () {
    const [pageMode, bindings] = usePageMode()

    const constructionTextStyle = displayHidden(pageMode === 'pullApart')

    return (
        <CenterBox>
            <Box width='large' height='medium' align='center' justify='center' as='main' {...bindings()}>
                <Suspense fallback={<CircleLoader color='white' />}>
                    <svg viewBox='-25 -75 200 200' transform='matrix(1, 0.2, 0.2, 1, 0, 0)'>
                        <LazyWaves pullApart={pageMode === 'pullApart'} />
                        <g transform='translate(4, -18)'>
                            <LazyEmojis active={pageMode === 'pullApart'} />
                        </g>
                    </svg>
                    <ConstructionTextAnimation style={constructionTextStyle} />
                </Suspense>
            </Box>
        </CenterBox>
    )
}

function usePageMode() {
    const [mode, setMode] = useState<'waves' | 'pullApart'>('waves')
    const bindings = useDrag(state => { if (state.down) setMode(mode === 'waves' ? 'pullApart' : 'waves') })

    return [mode, bindings] as [typeof mode, typeof bindings]
}

function displayHidden(hide: boolean) {
    return hide ? { display: 'none' } : {}
}