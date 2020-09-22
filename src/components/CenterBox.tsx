import { Box } from 'grommet'
import React, { ReactNode } from 'react'

export default function (props: { children?: ReactNode }) {
    return (
        <Box fill justify='center' align='center'>
            {props.children}
        </Box>
    )
}