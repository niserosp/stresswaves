import { Box, defaultProps, Stack, Text } from 'grommet'
import React, { ComponentProps, ReactNode, useCallback, useEffect } from 'react'
import { useDrag, useGesture, useHover } from 'react-use-gesture'
import { ReactEventHandlers } from 'react-use-gesture/dist/types'
import styled from 'styled-components'
import { ClipResult, ClipState, isActive, useClip } from '../../audio/clips'

export function AnnotationView(props: { clipState: ClipState, children?: ReactNode } & ComponentProps<typeof StyledStack>) {
    return (
        <StyledStack anchor='top-right' {...props}>
            {props.children}
            {isActive(props.clipState) && <Clip state={props.clipState} />}
        </StyledStack>
    )
}

const StyledStack = styled(Stack)`
  &:focus {
      outline: none;
  }

  cursor: default;
`

function Clip(props: { state: ClipState }) {
    return <Box role='status' round background={props.state.status === 'playing' ? 'accent-4' : 'accent-2'} pad='xxsmall' />
}

export function Annotation(props: { children?: ReactNode }) {
    const clip = useClip()
    const bindings = annotationInteraction(clip)

    return (
        <AnnotationView {...bindings} tabIndex={0} clipState={clip}>{props.children}</AnnotationView>
    )
}

function annotationInteraction(clip: ClipResult) {
    const bindings = {
        onFocus: () => clip.play(),
        onBlur: () => clip.stop(),
    }

    return bindings
}