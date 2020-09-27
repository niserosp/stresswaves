import { Howl } from 'howler'
import { useEffect, useState } from 'react'
import useInterval from 'react-useinterval'
import useSound from 'use-sound'
import { ExposedData, PlayFunction } from 'use-sound/dist/types'


export type ClipStatus = 'playing' | 'paused' | 'loading'

export type ClipState = {
    status: ClipStatus,
    progress: number
}

export type ClipResult = ClipState & { play: PlayFunction } & Pick<ExposedData, 'pause' | 'stop'>

export function useClip(): ClipResult {
    const [loaded, setLoaded] = useState(false)
    const [play, { pause, stop, isPlaying, sound }] = useSound('/test.mp3', {
        html5: true, preload: true, onload: () => setLoaded(true)
    } as any)

    const progress = useAudioProgress(sound)

    return {
        play,
        pause,
        stop,
        status: isPlaying ? (loaded ? 'playing' : 'loading') : 'paused',
        progress
    }
}

export function isActive(clipState: ClipState): boolean {
    return clipState.progress > 0 || clipState.status === 'playing'
}

function useAudioProgress(howl?: Howl) {
    const [progress, setProgress] = useState(0)

    useInterval(() => {
        if (howl?.playing()) setProgress(howl.seek() as number)
    }, 500)

    useEffect(() => {
        howl && howl.on('stop', () => setProgress(0))
    }, [howl])

    return progress
}