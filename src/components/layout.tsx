import { graphql, Link, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBars,
    faTimes,
} from "@fortawesome/free-solid-svg-icons"

import * as React from "react"

import {
    active,
    content,
} from "./layout.module.scss"

import "../style/global.scss"

const Navigation = ({ show }: { show: boolean }) => {
    return <nav className={ `${show ? active : undefined}` }>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about/">About Me</Link>
            </li>
            <li>
                <Link to="/blog">Blog</Link>
            </li>
        </ul>
    </nav>
}

const Layout = ({ pageTitle, children }: ILayoutData) => {
    const [show, setShow] = React.useState(false)
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
        <Helmet>
            <title>{ `${data.site.siteMetadata.title} - ${pageTitle}` }</title>
        </Helmet>
        <header>
            <button onClick={ () => setShow(!show) }>
                <FontAwesomeIcon icon={ show ? faTimes : faBars } size="2x"/>
            </button>
            <h1>{ data.site.siteMetadata.title }</h1>
            <Navigation show={ show }/>
        </header>
        <main>
            { children }
        </main>
        <footer>
            Generated on <em>{ builtTimeString }</em>
        </footer>
    </div>)
}

export default Layout
