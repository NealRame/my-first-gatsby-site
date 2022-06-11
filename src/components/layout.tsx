import { graphql, Link, useStaticQuery } from "gatsby"
import * as React from "react"

import {
    container,
    heading,
    navLinks,
    navLinkItem,
    navLinkText,
    siteHeader,
    sizeFooter,
} from "./layout.module.css"

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
    <div className={ container }>
        <title>{ pageTitle } | { data.site.siteMetadata.title }</title>
        <header className={ siteHeader }>{ data.site.siteMetadata.title }</header>
        <nav>
            <ul className={ navLinks }>
                <li className={ navLinkItem }>
                    <Link className={ navLinkText } to="/">Home</Link>
                </li>
                <li className={ navLinkItem }>
                    <Link className={ navLinkText } to="/about/">About</Link>
                </li>
                <li className={ navLinkItem }>
                    <Link className={ navLinkText } to="/blog">Blog</Link>
                </li>
            </ul>
        </nav>
        <main>
            <h1 className={ heading }>{ pageTitle }</h1>
            { children }
        </main>
        <footer className={ sizeFooter }>
            Generated on <em>{ builtTimeString }</em>
        </footer>
    </div>)
}

export default Layout
