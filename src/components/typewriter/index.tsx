import * as React from "react"

import {
    typewriter,
    typewriterLine,
} from "./typewriter.module.scss"

type ITypewriterProps = {
    messages: string | Array<string>

    erasingSpeed?: number

    typingSpeed?: number
    typingLag?: number
    typingPause?: number
}

enum TypewriterState {
    Typing,
    Erasing,
}

function delay(action: CallableFunction, ms: number) {
    const timerId = setTimeout(action, ms)
    return () => clearTimeout(timerId)
}

const Typewriter = (props: ITypewriterProps) => {
    const {
        erasingSpeed,
        typingSpeed,
        typingLag,
        typingPause,
    } = {
        erasingSpeed: 32,
        typingSpeed: 64,
        typingLag: 25,
        typingPause: 2000,
        ...props,
    }

    const messages = typeof(props.messages) === "string" ? [props.messages] : props.messages

    const [mode, setMode] = React.useState(TypewriterState.Erasing)
    const [currentTextIndex, setCurrentTextIndex] = React.useState(-1)
    const [buffer, setBuffer] = React.useState("")

    const eraseText = () => setBuffer(messages[currentTextIndex].slice(0, buffer.length - 1))
    const typeText = () => setBuffer(messages[currentTextIndex].slice(0, buffer.length + 1))

    const toggleMode = () => {
        if (mode === TypewriterState.Typing) {
            setMode(TypewriterState.Erasing)
        } else {
            setMode(TypewriterState.Typing)
            setCurrentTextIndex((currentTextIndex + 1)%messages.length)
        }
    }

    React.useEffect(() => {
        const text = messages[currentTextIndex] ?? ""

        if (mode === TypewriterState.Typing) {
            if (buffer.length < text.length) {
                return delay(typeText, typingSpeed + typingLag*Math.random())
            }
        }

        if (mode === TypewriterState.Erasing) {
            if (buffer.length > 0) {
                return delay(eraseText, erasingSpeed)
            }
        }

        return delay(toggleMode, typingPause)
    })

    return (
        <div className={ typewriter }>
            <span className={ typewriterLine }>{ buffer }</span>
        </div>
    )
}

export default Typewriter