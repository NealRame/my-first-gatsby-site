import * as React from "react"

import {
    clock,
} from "./clock.module.css"

type AnalogClockProps = {
    date: Date
}

class AnalogClock extends React.Component<AnalogClockProps> {
    private ref_: React.RefObject<HTMLCanvasElement>

    constructor(props: AnalogClockProps) {
        super(props)
        this.ref_ = React.createRef()
    }

    drawHrs(
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        radius: number,
    ) {
        for (let i = 0; i < 12; i++) {
            const angle = i*Math.PI/6
            ctx.beginPath()
            ctx.moveTo(
                centerX + Math.cos(angle)*radius*.7,
                centerY + Math.sin(angle)*radius*.7,
            )
            ctx.lineTo(
                centerX + Math.cos(angle)*radius*.9,
                centerY + Math.sin(angle)*radius*.9,
            )
            ctx.strokeStyle = "black"
            ctx.stroke()
            ctx.closePath()
        }

        const hours = this.props.date.getHours()
        const minutes = this.props.date.getMinutes()
        const hoursAngle = (30*hours + minutes/2 - 90)*Math.PI/180
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(
            centerX + radius*Math.cos(hoursAngle)*.4,
            centerY + radius*Math.sin(hoursAngle)*.4,
        )
        ctx.strokeStyle = "black"
        ctx.stroke()
        ctx.closePath()
    }

    drawMin(
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        radius: number,
    ) {
        for (let i = 0; i < 60; i++) {
            const angle = i*Math.PI/30
            ctx.beginPath()
            ctx.moveTo(
                centerX + Math.cos(angle)*radius*.8,
                centerY + Math.sin(angle)*radius*.8,
            )
            ctx.lineTo(
                centerX + Math.cos(angle)*radius*.9,
                centerY + Math.sin(angle)*radius*.9,
            )
            ctx.strokeStyle = "black"
            ctx.stroke()
            ctx.closePath()
        }

        const minutes = this.props.date.getMinutes()
        const minuteAngle = (6*minutes - 90)*Math.PI/180
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(
            centerX + radius*Math.cos(minuteAngle)*.7,
            centerY + radius*Math.sin(minuteAngle)*.7,
        )
        ctx.strokeStyle = "black"
        ctx.stroke()
        ctx.closePath()
    }

    drawSec(
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        radius: number,
    ) {
        const seconds = this.props.date.getSeconds()
        const secondAngle = (6*seconds - 90)*Math.PI/180
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(
            centerX + radius*Math.cos(secondAngle)*.7,
            centerY + radius*Math.sin(secondAngle)*.7,
        )
        ctx.strokeStyle = "red"
        ctx.stroke()
        ctx.closePath()
    }

    componentDidUpdate() {
        const canvas = this.ref_.current as HTMLCanvasElement
        const ctx = canvas.getContext("2d")
        if (ctx) {
            const { width, height } = canvas
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

            this.drawHrs(ctx, centerX, centerY, radius)
            this.drawMin(ctx, centerX, centerY, radius)
            this.drawSec(ctx, centerX, centerY, radius)

            ctx.beginPath()
            ctx.arc(centerX, centerY, 2, 0, 360)
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.closePath()
        }
    }

    render() {
        return <canvas
            ref={this.ref_}
            width="64"
            height="64"
        />
    }
}

type ClockProps = {
    city: string,
    offset: number,
}

type ClockState = {
    date: Date
}

class Clock extends React.Component<ClockProps, ClockState> {
    private timerID_: ReturnType<typeof setInterval> | null = null

    constructor(props: ClockProps) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    private tick_() {
        const d = new Date()
        const t = d.getTime() + d.getTimezoneOffset()*60000 + this.props.offset*3600000
        this.setState({
            date: new Date(t)
        })
    }

    componentDidMount() {
        this.timerID_ = setInterval(() => this.tick_(), 1000)
    }

    componentWillUnmount() {
        if (this.timerID_) {
            clearInterval(this.timerID_)
        }
    }

    render() {
        return <div className={clock}>
            <h2>{this.props.city}</h2>
            <AnalogClock date={this.state.date} />
            <span>{this.state.date.toLocaleDateString()}</span>
        </div>
    }
}

export default Clock
