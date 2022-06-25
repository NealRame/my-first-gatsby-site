import * as React from "react"

import {
    typewriter,
    typewriterLine,
} from "./typewriter.module.scss"

type ITypewriterProps = {
    text: string
    interval: number
}

const Typewriter = ({ text, interval }: ITypewriterProps) => {
    const [currentText, setCurrentText] = React.useState("")

    React.useEffect(() => {
        const timerId = setTimeout(() => {
            if (currentText.length !== text.length) {
                setCurrentText(text.slice(0, currentText.length + 1))
            }
        }, interval + Math.random() * 25)
        return () => clearTimeout(timerId)
    })

    return (
        <div className={ typewriter }>
            <span className={ typewriterLine }>{ currentText }</span>
        </div>
    )
}

export default Typewriter