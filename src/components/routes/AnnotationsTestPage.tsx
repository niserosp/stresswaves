import { Heading, Paragraph, Text } from 'grommet'
import React from 'react'
import { Annotation } from '../audio/annotations'
import CenterBox from '../CenterBox'

export default () => {
    return (
        <CenterBox>
            <Heading>Annotations Test Page</Heading>
            <Paragraph>Audio annotations are areas of a page where a user may interact to hear audio. Usually they will be used for text, but not necessarily always. The purpose of this page is to test implementations of audio annotations.</Paragraph>

            <Annotation><Text>Example annotation</Text></Annotation>
        </CenterBox>
    )
}