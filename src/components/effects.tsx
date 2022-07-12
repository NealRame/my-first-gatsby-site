import * as React from "react"
import {
    Transition,
    TransitionStatus,
} from "react-transition-group"

type IFXTransitions = {
    entering?: Record<string, unknown>
    entered?: Record<string, unknown>
    exiting?: Record<string, unknown>
    exited?: Record<string, unknown>
    unmounted?: Record<string, unknown>
}

type IRevealFXProps = {
    children: React.ReactNode
    enter: boolean
    duration?: number,
    classNames?: Array<string>
    onEnter?: () => void
    onExit?: () => void
}

const RevealFXDefaults = {
    duration: 300,
    classNames: [],
    onEnter: () => {},
    onExit: () => {},
}

export const createRevealFX = (transitions: IFXTransitions) => {
    transitions = { ...RevealTransitionsDefaults, ...transitions }
    return ({ enter, children, ...props }: IRevealFXProps) => {
        const { duration, classNames, onEnter, onExit } = {
            ...RevealFXDefaults,
            ...props
        }

        const defaultStyle = {
            transition: `opacity ${duration}ms ease-in-out`,
        }

        return <Transition
            in={ enter }
            onEnter={ onEnter }
            onExit={ onExit }
            timeout={ duration }
        >{(status: TransitionStatus) => <div
            className={ classNames.join(" ") }
            style={{
                ...defaultStyle,
                ...transitions[status],
            }}
        >{ children }</div>}</Transition>
    }
}

const RevealTransitionsDefaults = {
    entering: {},
    entered: {},
    exiting: {},
    exited: {},
    unmounted: {},
}

const FadeInTransitions: IFXTransitions = {
    entering: {
        opacity: 0,
    },
    entered: {
        opacity: 1,
    },
    exiting: {
        opacity: 1,
    },
    exited: {
        opacity: 0,
    },
}

const FadeOutTransitions: IFXTransitions = {
    entering: {
        opacity: 1,
    },
    entered: {
        opacity: 0,
    },
    exiting: {
        opacity: 0,
    },
    exited: {
        opacity: 1,
    },
}

const ShowTransitions: IFXTransitions = {
    entering: {
        display: "block",
        opacity: 0,
    },
    entered: {
        display: "block",
        opacity: 1,
    },
    exiting: {
        display: "block",
        opacity: 0,
    },
    exited: {
        display: "none",
    },
}

export const FadeIn = createRevealFX(FadeInTransitions)
export const FadeOut = createRevealFX(FadeOutTransitions)
export const Reveal = createRevealFX(ShowTransitions)

type ISlideFXProps = {
    children: React.ReactNode
    enter: boolean
    duration?: number,
    classNames?: Array<string>
    onEnter?: () => void
    onExit?: () => void
}

type SlideDirection = "left" | "right" | "up" | "down"

const SlideFXDefaults = {
    duration: 300,
    classNames: [],
    onEnter: () => {},
    onExit: () => {},
}

const SlideLeftTransitions = {
    left: {
        entering: {
            transform: "translateX(-100%)",
        },
        entered: {
            transform: "translateX(0)",
        },
        exiting: {
            transform: "translateX(0)",
        },
        exited: {
            transform: "translateX(-100%)",
        },
    },
    right: {
        entering: {
            transform: "translateX(100%)",
        },
        entered: {
            transform: "translateX(0)",
        },
        exiting: {
            transform: "translateX(0)",
        },
        exited: {
            transform: "translateX(100%)",
        },
    },
    up: {
        entering: {
            transform: "translateY(-100%)",
        },
        entered: {
            transform: "translateY(0)",
        },
        exiting: {
            transform: "translateY(0)",
        },
        exited: {
            transform: "translateY(-100%)",
        },
    },
    down: {
        entering: {
            transform: "translateY(100%)",
        },
        entered: {
            transform: "translateY(0)",
        },
        exiting: {
            transform: "translateY(0)",
        },
        exited: {
            transform: "translateY(100%)",
        },
    },
}

export const createSlideFX = (direction: SlideDirection) => {
    const transitions = { unmounted: { }, ...SlideLeftTransitions[direction] }
    return ({ enter, children, ...props }: IRevealFXProps) => {
        const { duration, classNames, onEnter, onExit } = {
            ...SlideFXDefaults,
            ...props
        }

        const defaultStyle = {
            transition: `transform ${duration}ms ease-in-out`,
        }

        return <Transition
            in={ enter }
            onEnter={ onEnter }
            onExit={ onExit }
            timeout={ duration }
        >{(status: TransitionStatus) => <div
            className={ classNames.join(" ") }
            style={{
                ...defaultStyle,
                ...transitions[status],
            }}
        >{ children }</div>}</Transition>
    }
}

export const SlideLeft = createSlideFX("left")
export const SlideRight = createSlideFX("right")
export const SlideUp = createSlideFX("up")
export const SlideDown = createSlideFX("down")
