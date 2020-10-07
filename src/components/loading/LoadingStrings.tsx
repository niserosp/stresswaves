import { Box, Stack } from 'grommet'
import React, { createContext, ReactNode, Suspense, useContext, useEffect, useReducer } from 'react'
import VibratingStrings from '../animations/svgElementAnimations/VibratingString'

const LoadingContext = createContext((action: any) => { })

export default function LoadingStrings(props: { children?: ReactNode }) {
    const reducer = (state: number, action: any) => {
        switch (action) {
            case 'LOADING':
                return state + 1
            case 'DONE':
                return state - 1
            default:
                return state
        }
    }
    const [loadingCount, dispatch] = useReducer(reducer, 0)

    return (
        <LoadingContext.Provider value={dispatch}>
            <Stack fill>
                <svg width='100%' height='100%' stroke='white' viewBox='-1 -1 2 2' strokeWidth='0.01' fill='none'>
                    <VibratingStrings moving={Boolean(loadingCount)} />
                </svg>
                <Box fill>{props.children}</Box>
            </Stack>
        </LoadingContext.Provider>
    )
}

export function LoadingSuspense(props: { children?: ReactNode }) {
    const dispatch = useContext(LoadingContext)

    const Fallback = () => {
        useEffect(() => {
            dispatch('LOADING')

            return () => dispatch('DONE')
        })

        return null
    }

    return (
        <Suspense fallback={<Fallback />}>
            {props.children}
        </Suspense>
    )
}