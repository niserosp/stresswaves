import { Text } from 'grommet'
import React, { CSSProperties, useEffect, useState } from 'react'
import { animated, config, useSpring } from 'react-spring'
import useInterval from 'react-useinterval'

export default (props: { style?: CSSProperties }) => {
    const text = useCycleText(words, 4000)
    const [animatedText, style] = useTextFadeTransition(text)

    return <AnimatedText color='accent-1' style={{ ...props.style, ...style }}>{animatedText}</AnimatedText>
}

const AnimatedText = animated(Text)

function useTextFadeTransition(incoming: string) {
    const [style, setSpring] = useSpring(() => ({ opacity: 1, config: { native: true, ...config.gentle } }))
    const [current, setCurrent] = useState(incoming)

    const beginFadeIn = () => {
        setCurrent(incoming)
        setSpring({ opacity: 1 })
    }

    useEffect(() => {
        setSpring({ opacity: 0, onRest: beginFadeIn })
    }, [setSpring, incoming])


    return [current, style] as [typeof current, typeof style]
}

function useCycleText(strings: string[], interval: number) {
    const [textIndex, setTextIndex] = useState(0)
    useInterval(() => {
        setTextIndex((textIndex + 1) % strings.length)
    }, interval)

    return strings[textIndex]
}

const words = ["writing and more", "coming sometime", "hover above"]