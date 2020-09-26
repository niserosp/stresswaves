import { render, screen } from '@testing-library/react'
import { Text } from 'grommet'
import React from 'react'
import { ClipState } from '../../audio/clips'
import { AnnotationView } from './annotations'

describe('Creating a visible annotation', () => {
    describe('When we create Text', () => {
        describe('And wrap it with an AnnotationView in playing state', () => {
            it('Then a status is displayed', () => {
                const text = <Text>Test Text</Text>
                const clipState: ClipState = {
                    status: 'playing',
                    progress: 20
                }
                render(<AnnotationView clipState={clipState}>{text}</AnnotationView>)

                expect(screen.getByRole('status')).toBeInTheDocument()
            })
        })

        describe('And wrap it with an AnnotationView in paused state and zero progress', () => {
            it('Then no status is displayed', () => {
                const text = <Text>Test Text</Text>
                const clipState: ClipState = {
                    status: 'paused',
                    progress: 0
                }
                render(<AnnotationView clipState={clipState}>{text}</AnnotationView>)

                expect(screen.queryByRole('status')).toBeNull()
            })
        })
    })
})