import { render, screen } from '@testing-library/react'
import { Text } from 'grommet'
import React from 'react'
import { ClipState } from '../../audio/clips'
import { WavyAnnotationView } from './annotations'

describe('Creating a visible annotation', () => {
    describe('When we create Text', () => {
        describe('And wrap it with an AnnotationView in playing state', () => {
            beforeAll(() => {
                const text = <Text>Test Text</Text>
                const clipState: ClipState = {
                    status: 'playing',
                    progress: 20
                }
                render(<WavyAnnotationView clipState={clipState}>{text}</WavyAnnotationView>)
            })

            it('Then a status is displayed with ARIA label', () => {
                expect(screen.getByRole('status')).toBeInTheDocument()
                expect(screen.getByRole('status').getAttribute('aria-label')).toEqual('Audio annotation: playing')
            })
        })

        describe('And wrap it with an AnnotationView in paused state and zero progress', () => {
            beforeAll(() => {
                const text = <Text>Test Text</Text>
                const clipState: ClipState = {
                    status: 'paused',
                    progress: 0
                }
                render(<WavyAnnotationView clipState={clipState}>{text}</WavyAnnotationView>)
            })

            it('Then a status is displayed with ARIA label', () => {
                expect(screen.getByRole('status')).toBeInTheDocument()
                expect(screen.getByRole('status').getAttribute('aria-label')).toEqual('Audio annotation: paused')
            })
        })
    })
})