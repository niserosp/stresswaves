import { Box } from 'grommet'
import React, { ComponentProps, ReactNode, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useHover } from 'react-use-gesture'
import styled from 'styled-components'
import { ClipResult, ClipState, useClip } from '../../audio/clips'
import WavyClip from '../animations/svgElementAnimations/clip/WavyClip'

export function AnnotationView(props: { clipState: ClipState, children?: ReactNode } & ComponentProps<typeof StyledBox>) {
    const [hovering, setHovering] = useState(false)
    const hoverBindings = useHover(({ hovering }) => !isMobile && setHovering(hovering), { passive: true })

    return (
        <Box {...hoverBindings()}>
            <StyledBox direction='row' {...props}>
                {props.children}
                <AnnotationStatus clipState={props.clipState}>
                    <WavyClip state={props.clipState} hover={hovering} />
                </AnnotationStatus>
            </StyledBox>
        </Box>
    )
}

const StyledBox = styled(Box)`
  &:focus {
      outline: none;
  }

  cursor: default;
`

function AnnotationStatus(props: { clipState: ClipState, children?: ReactNode }) {
    return (
        <Box
            role='status'
            aria-label={`Audio annotation: ${props.clipState.status}`}
        >
            {props.children}
        </Box>
    )
}

export function Annotation(props: { children?: ReactNode }) {
    const clip = useClip()
    const bindings = useAnnotationInteraction(clip)

    return (
        <AnnotationView {...bindings} role='button' tabIndex={0} clipState={clip}>{props.children}</AnnotationView>
    )
}

function useAnnotationInteraction(clip: ClipResult) {
    const toggle = () => clip.status === 'playing' ? clip.pause() : clip.play()

    const bindings = {
        onClick: toggle,
        onBlur: () => { clip.stop() },
    }

    return bindings
}