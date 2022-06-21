import { cp } from "fs/promises"
import * as React from "react"

import {
    clock,
} from "./clock.module.css"

type AnalogClockProps = {
    date: Date
}

function AnalogClock({ date }: AnalogClockProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const drawHrs = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        for (let i = 0; i < 12; i++) {
            const angle = i*Math.PI/6
            ctx.beginPath()
            ctx.moveTo(
                x + .7*r*Math.cos(angle),
                y + .7*r*Math.sin(angle),
            )
            ctx.lineTo(
                x + .9*r*Math.cos(angle),
                y + .9*r*Math.sin(angle),
            )
            ctx.strokeStyle = "black"
            ctx.stroke()
            ctx.closePath()
        }

        const hours = date.getHours()
        const minutes = date.getMinutes()
        const hoursAngle = (30*hours + minutes/2 - 90)*Math.PI/180
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(
            x + .4*r*Math.cos(hoursAngle),
            y + .4*r*Math.sin(hoursAngle),
        )
        ctx.strokeStyle = "black"
        ctx.stroke()
        ctx.closePath()
    }

    const drawMin = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        for (let i = 0; i < 60; i++) {
            const angle = i*Math.PI/30
            ctx.beginPath()
            ctx.moveTo(
                x + .8*r*Math.cos(angle),
                y + .8*r*Math.sin(angle),
            )
            ctx.lineTo(
                x + .9*r*Math.cos(angle),
                y + .9*r*Math.sin(angle),
            )
            ctx.strokeStyle = "black"
            ctx.stroke()
            ctx.closePath()
        }

        const minutes = date.getMinutes()
        const minuteAngle = (6*minutes - 90)*Math.PI/180
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(
            x + .7*r*Math.cos(minuteAngle),
            y + .7*r*Math.sin(minuteAngle),
        )
        ctx.strokeStyle = "black"
        ctx.stroke()
        ctx.closePath()
    }

    const drawSec = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        const seconds = date.getSeconds()
        const secondAngle = (6*seconds - 90)*Math.PI/180
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(
            x + .7*r*Math.cos(secondAngle),
            y + .7*r*Math.sin(secondAngle),
        )
        ctx.strokeStyle = "red"
        ctx.stroke()
        ctx.closePath()
    }

    React.useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d")
        if (ctx) {
            const { width, height } = ctx.canvas

            const centerX = width/2
            const centerY = height/2
            const radius = height/2

            ctx.clearRect(0, 0, width, height)

            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, 360)
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.closePath()

            ctx.beginPath()
            ctx.arc(centerX, centerY, radius - 2, 0, 360)
            ctx.fillStyle = "white"
            ctx.fill()
            ctx.closePath()

            drawHrs(ctx, centerX, centerY, radius)
            drawMin(ctx, centerX, centerY, radius)
            drawSec(ctx, centerX, centerY, radius)

            ctx.beginPath()
            ctx.arc(centerX, centerY, 2, 0, 360)
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.closePath()
        }
    })

    return (
        <canvas ref={canvasRef} width="64" height="64"/>
    )
}

type ClockProps = {
    city: string,
    offset: number,
}

function Clock({ city, offset }: ClockProps) {
    const [date, setDate] = React.useState(new Date())

    React.useEffect(() => {
        const timerID = setInterval(() => {
            const d = new Date()
            setDate(new Date(d.getTime() + (d.getTimezoneOffset()*6 + offset*360)*10000))
        }, 1000)
        return () => clearInterval(timerID)
    }, [])

    return (
        <div className={clock}>
            <h2>{city}</h2>
            <AnalogClock date={date} />
            <span>{date.toLocaleDateString()}</span>
        </div>
    )
}

export default Clock
