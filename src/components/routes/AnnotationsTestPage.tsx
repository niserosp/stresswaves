import { Box, Heading, Paragraph, Text } from 'grommet'
import React from 'react'
import { FlowerAnnotation, WavyAnnotation } from '../audio/annotations'
import CenterBox from '../CenterBox'
import { clips } from '../../audio/clips'

export default () => {
    return (
        <CenterBox>
            <Box margin='large'>
                <Heading>Annotations Test Page</Heading>
                <Paragraph>Audio annotations are areas of a page where a user may interact to hear audio. Usually they will be used for text, but not necessarily always. The purpose of this page is to test implementations of audio annotations.</Paragraph>

                <Box align='center' width='100%'>
                    <WavyAnnotation href={clips.get('test1')}><Text>Example annotation</Text></WavyAnnotation>
                    <br />
                    <FlowerAnnotation href={clips.get('test2')} loop><Text>Another example</Text></FlowerAnnotation>
                </Box>
            </Box>
        </CenterBox>
    )
}