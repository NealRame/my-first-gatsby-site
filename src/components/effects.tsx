import * as React from "react"
import {
    Transition,
} from "react-transition-group"

type IFXTransitions = {
    enter: Record<string, unknown>
    entering: Record<string, unknown>
    entered: Record<string, unknown>

    exit: Record<string, unknown>
    exiting: Record<string, unknown>
    exited: Record<string, unknown>
}

const FXTransitionsDefaults = {
    enter: {},
    entering: {},
    entered: {},
    exit: {},
    exiting: {},
    exited: {},
}

type IFXProps = {
    children: React.ReactNode
    delay?: number
    duration?: number,
    enter: boolean
    id?: string,
    classNames?: Array<string>
    onEntered?: () => void
    onExited?: () => void
    log?: boolean
}

const FXDefaults = {
    delay: 0,
    duration: 300,
    classNames: [],
    onEntered: () => {},
    onExited: () => {},
    log: false,
}

export const createRevealFX = (
    transitions: IFXTransitions
) => {
    transitions = { ...FXTransitionsDefaults, ...transitions }
    return ({ enter, children, ...props }: IFXProps) => {
        const [style, setStyle] = React.useState({})

        const { duration, onEntered, onExited, log: verbose } = {
            ...FXDefaults,
            ...props
        }

        const classNames = (props.classNames ?? []).join(" ")
        const cssTransition = {
            transition: `opacity ${duration}ms ease-in-out`,
        }

        return <Transition
            in={ enter }
            timeout={ duration }
            onEnter={ (node: HTMLElement) => {
                const style = { ...transitions.enter }
                if (verbose) {
                    console.log("onEnter", transitions.enter, node)
                }
                setStyle(style)
            }}
            onEntering={ () => {
                const style = {
                    ...cssTransition,
                    ...transitions.enter,
                    ...transitions.entering
                }
                if (verbose) {
                    console.log("onEntering", style)
                }
                setStyle(style)
            }}
            onEntered={() => {
                const style = {
                    ...transitions.enter,
                    ...transitions.entered
                }
                if (verbose) {
                    console.log("onEntered", style)
                }
                setStyle(style)
                onEntered()
            }}
            onExit={() => {
                const style = { ...transitions.exit }
                if (verbose) {
                    console.log("onExit", style)
                }
                setStyle(style)
            }}
            onExiting={() => {
                const style = {
                    ...cssTransition,
                    ...transitions.exit,
                    ...transitions.exiting
                }
                if (verbose) {
                    console.log("onExit", style)
                }
                setStyle(style)
            }}
            onExited={() => {
                const style = {
                    ...transitions.exit,
                    ...transitions.exited
                }
                if (verbose) {
                    console.log("onExited", style)
                }
                setStyle(style)
                onExited()
            }}
        ><div
            className={ classNames }
            id={ props.id }
            style={ style }
        >{ children }</div></Transition>
    }
}

const FadeInTransitions: IFXTransitions = {
    ...FXTransitionsDefaults,
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
    ...FXTransitionsDefaults,
    entering: {
        opacity: 0,
    },
    entered: {
        opacity: 0,
    },
    exiting: {
        opacity: 1,
    },
    exited: {
        opacity: 1,
    },
}

const RevealTransitions: IFXTransitions = {
    ...FXTransitionsDefaults,
    enter: {
        zIndex: 1,
    },
    entering: {
        opacity: 1,
    },
    entered: {
        opacity: 1,
    },
    exit: {
        zIndex: 1,
    },
    exited: {
        zIndex: -1,
    },
}

export const FadeIn = createRevealFX(FadeInTransitions)
export const FadeOut = createRevealFX(FadeOutTransitions)
export const Reveal = createRevealFX(RevealTransitions)

