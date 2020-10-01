import { Box } from 'grommet'
import React, { ComponentProps, ReactNode, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useHover } from 'react-use-gesture'
import styled from 'styled-components'
import { ClipResult, ClipState, useClip } from '../../audio/clips'
import { FlowerClip } from '../animations/svgElementAnimations/clip/FlowerClip'
import WavyClip from '../animations/svgElementAnimations/clip/WavyClip'

export function WavyAnnotationView(props: { clipState: ClipState, children?: ReactNode } & ComponentProps<typeof NoFocusBox>) {
    const [hovering, hoverBindings] = useIsHovering()

    return (
        <Box {...hoverBindings()}>
            <NoFocusBox direction='row' {...props}>
                {props.children}
                <AnnotationStatus clipState={props.clipState}>
                    <WavyClip state={props.clipState} hover={hovering} />
                </AnnotationStatus>
            </NoFocusBox>
        </Box>
    )
}

function FlowerAnnotationView(props: { children?: ReactNode, clipState: ClipState } & ComponentProps<typeof NoFocusBox>) {
    const [hovering, hoverBindings] = useIsHovering()

    return (
        <Box {...hoverBindings()}>
            <NoFocusBox direction='row' {...props}>
                {props.children}
                <AnnotationStatus clipState={props.clipState} >
                    <FlowerClip state={props.clipState} hovering={hovering} />
                </AnnotationStatus>
            </NoFocusBox>
        </Box>
    )
}

function useIsHovering() {
    const [hovering, setHovering] = useState(false)
    const hoverBindings = useHover(({ hovering }) => !isMobile && setHovering(hovering), { passive: true })

    return [hovering, hoverBindings] as [typeof hovering, typeof hoverBindings]
}

const NoFocusBox = styled(Box)`
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

export function WavyAnnotation(props: { href: string, children?: ReactNode }) {
    const clip = useClip(props.href)
    const bindings = useAnnotationInteraction(clip)

    return (
        <WavyAnnotationView {...bindings} role='button' tabIndex={0} clipState={clip}>{props.children}</WavyAnnotationView>
    )
}

export function FlowerAnnotation(props: { href: string, children?: ReactNode, loop?: boolean }) {
    const clip = useClip(props.href, { loop: props.loop })
    const bindings = useAnnotationInteraction(clip)

    return (
        <FlowerAnnotationView {...bindings} clipState={clip}>{props.children}</FlowerAnnotationView>
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