import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    faGhost,
} from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"

import "../style/404.scss"

const NotFoundPage = () => {
    return (
        <Layout pageTitle="404 Not Found">
            <div className="page-404-content">
                <FontAwesomeIcon icon={ faGhost } size="10x" />
                <h1>Page Not Found</h1>
            </div>
        </Layout>
    )
}

export default NotFoundPage
