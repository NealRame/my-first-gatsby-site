import * as React from "react"

import Layout from "../components/layout"
import Typewriter from "../components/typewriter"

const IndexPage = () => (
    <Layout pageTitle="Home Page">
        <Typewriter messages={[
            "GREETINGS",
            "HOW ARE YOU FEELING TODAY?",
            "SHALL WE PLAY A GAME?",
        ]}/>
    </Layout>
)

export default IndexPage
