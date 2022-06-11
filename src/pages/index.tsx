import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

import Layout from "../components/layout"

const IndexPage = () => (
    <Layout pageTitle="Home Page">
        <p>I'm making this by following the Gatsby Tutorial.</p>
        <StaticImage
            src="../images/ace.jpg"
            alt="Random Image"
        />
    </Layout>
)

export default IndexPage
