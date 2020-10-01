import { config, useSpring } from "react-spring"
import { ClipState } from "../../../../audio/clips"

export function useLoadingOpacity(clipState: ClipState) {
    const active = clipState.status === 'loading'

    const [{ opacity }] = useSpring(() => ({
        from: { opacity: 0.75 },
        to: active ? { opacity: 0.5 } : { opacity: 0.75 },
        loop: true,
        config: config.stiff
    }), [active])

    return opacity
}