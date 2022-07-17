import * as React from "react"
import { createUseStyles } from "react-jss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    faGhost
} from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"

const useStyles = createUseStyles({
    page404: {
        color: "red",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",

        "& > h1": {
            color: "inherit",
            fontFamily: ["lores-9-wide", "sans-serif"],
            fontSize: "2rem",
            fontWeight: 700,
        }
    }
})

const NotFoundPage = () => {
    const classes = useStyles()
    return (
        <Layout pageTitle="404 Not Found">
            <div className={ classes.page404 }>
                <FontAwesomeIcon icon={ faGhost } size="10x" />
                <h1>Page Not Found</h1>
            </div>
        </Layout>
    )
}

export default NotFoundPage
