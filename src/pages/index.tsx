import * as React from "react"

import Layout from "../components/layout"
import Typewriter from "../components/typewriter"

const IndexPage = () => (
    <Layout pageTitle="Home Page">
        <p>I'm making this by following the Gatsby Tutorial.</p>
        <Typewriter interval={64} text="SHALL WE PLAY A GAME?"/>
    </Layout>
)

export default IndexPage
