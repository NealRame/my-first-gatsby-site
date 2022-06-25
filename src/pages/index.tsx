import * as React from "react"

import Layout from "../components/layout"
import Typewriter from "../components/typewriter"

const IndexPage = () => (
    <Layout pageTitle="Home Page">
        <Typewriter interval={64} text="SHALL WE PLAY A GAME?"/>
    </Layout>
)

export default IndexPage
