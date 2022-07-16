import * as React from "react"
import {
    Transition,
} from "react-transition-group"

type ITransitionConfig = {
    enter?: Record<string, unknown>
    entering?: Record<string, unknown>
    entered?: Record<string, unknown>

    exit?: Record<string, unknown>
    exiting?: Record<string, unknown>
    exited?: Record<string, unknown>

    enteringEasing?: string
    exitingEasing?: string

    properties?: Array<string> | string
}

const TransitionConfigDefault = {
    enter: {},
    entering: {},
    entered: {},
    
    exit: {},
    exiting: {},
    exited: {},

    enteringEasing: "ease-in-out",
    exitingEasing: "ease-in-out",

    properties: "all",
}

type ITransitionProps = {
    children: React.ReactNode
    delay?: number,
    duration?: number,
    enter: boolean
    onEntered?: () => void
    onExited?: () => void
    log?: boolean
}

const TransitionPropsDefaults = {
    classNames: [],
    delay: 0,
    duration: 300,
    onEntered: () => {},
    onExited: () => {},
    log: false,
}

function createCSSTransitionProperty(
    properties: Array<string>,
    duration: number,
    delay: number,
    easing: string,
): { transition: string } {
    return {
        transition: properties.map(
            prop => `${prop} ${duration}ms ${easing} ${delay}ms`
        ).join(", "),
    }
}

function createCSSTransitionProperties(
    properties: Array<string> | string,
    duration: number,
    delay: number,
    enteringEasing: string,
    exitingEasing: string,
): [{ transition: string }, { transition: string }] {
    return typeof properties === "string"
        ? createCSSTransitionProperties([properties], duration, delay, enteringEasing, exitingEasing)
        : [enteringEasing, exitingEasing].map(easing => {
            return createCSSTransitionProperty(properties, duration, delay, easing)
        }) as [{ transition: string }, { transition: string }]
}

export const createTransition = (config: ITransitionConfig) => {
    const {
        properties,
        enteringEasing,
        exitingEasing,
        ...transitions
    } = {
        ...TransitionConfigDefault,
        ...config,
    } as Required<ITransitionConfig>

    return ({ children, enter, ...props }: ITransitionProps) => {
        const [style, setStyle] = React.useState({})
        const { delay, duration, onEntered, onExited, log: verbose } = {
            ...TransitionPropsDefaults,
            ...props
        }

        const [
            enteringCSSTransitions,
            exitingCSSTransitions,
        ] = createCSSTransitionProperties(
            properties,
            duration,
            delay,
            enteringEasing,
            exitingEasing
        )

        return <Transition
            in={ enter }
            timeout={ duration }
            onEnter={ () => {
                const style = { ...transitions.enter }
                if (verbose) {
                    console.log("onEnter", style)
                }
                setStyle(style)
            } }
            onEntering={ () => {
                const style = {
                    ...enteringCSSTransitions,
                    ...transitions.enter,
                    ...transitions.entering
                }
                if (verbose) {
                    console.log("onEntering", style)
                }
                setStyle(style)
            } }
            onEntered={ () => {
                const style = {
                    ...transitions.enter,
                    ...transitions.entered
                }
                if (verbose) {
                    console.log("onEntered", style)
                }
                setStyle(style)
                onEntered()
            } }
            onExit={ () => {
                const style = { ...transitions.exit }
                if (verbose) {
                    console.log("onExit", style)
                }
                setStyle(style)
            } }
            onExiting={ () => {
                const style = {
                    ...exitingCSSTransitions,
                    ...transitions.exit,
                    ...transitions.exiting
                }
                if (verbose) {
                    console.log("onExit", style)
                }
                setStyle(style)
            } }
            onExited={ () => {
                const style = {
                    ...transitions.exit,
                    ...transitions.exited
                }
                if (verbose) {
                    console.log("onExited", style)
                }
                setStyle(style)
                onExited()
            } }
        >{() => {
            if (React.isValidElement(children)) {
                const childstyle = { ...children.props.style, ...style }
                return React.cloneElement(
                    React.Children.only(children),
                    { style: childstyle }
                )
            }
            throw new Error("Transition: children must be a valid React element")
        }}
        </Transition>
    }
}

const FadeInTransitions: ITransitionConfig = {
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
    properties: "opacity",
}

const FadeOutTransitions: ITransitionConfig = {
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
    properties: "opacity",
}

const RevealTransitions: ITransitionConfig = {
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
    properties: "opacity",
}

const SlideUpTransitions: ITransitionConfig = {
    enter: {
        transform: "translateY(-100%)",
    },
    entering: {
        transform: "translateY(0)",
    },
    entered: {
        transform: "translateY(0)",
    },
    exiting: {
        transform: "translateY(-100%)",
    },
    properties: "transform",
}

export const FadeIn = createTransition(FadeInTransitions)
export const FadeOut = createTransition(FadeOutTransitions)
export const Reveal = createTransition(RevealTransitions)
export const SlideUp = createTransition(SlideUpTransitions)