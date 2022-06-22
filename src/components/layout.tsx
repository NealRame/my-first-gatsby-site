import { graphql, Link, useStaticQuery } from "gatsby"
import * as React from "react"

import "../style/global.scss";

import {
    content,
    heading,
} from "./layout.module.scss"

const Layout = ({ pageTitle, children }: ILayoutData) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                buildTime
                siteMetadata {
                    title
                }
            }
        }
    `)
    const builtTimeString = (new Date(data.site.buildTime)).toLocaleString()
    return (
    <div id={ content }>
        <header>
            <h1>{ data.site.siteMetadata.title }</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about/">About</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <h1>{ pageTitle }</h1>
            { children }
        </main>
        <footer>
            Generated on <em>{ builtTimeString }</em>
        </footer>
    </div>)
}

export default Layout
