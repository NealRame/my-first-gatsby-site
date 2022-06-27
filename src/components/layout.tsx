import { graphql, Link, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBars,
    faEnvelope,
    faTimes,
} from "@fortawesome/free-solid-svg-icons"

import * as React from "react"

import {
    active,
    content,
    navbar,
} from "./layout.module.scss"

import "../style/global.scss"


type INavigationBarProps = {
    onShowMenuClicked: () => void
    onShowContactClicked: () => void
    title: string
}

const NavigationBar = ({
    onShowMenuClicked,
    onShowContactClicked,
    title,
}: INavigationBarProps) => {
    return <div className={ navbar }>
        <button onClick={ onShowMenuClicked }>
            <FontAwesomeIcon icon={ faBars } size="2x"/>
        </button>
        <h1>{ title }</h1>
        <button onClick={ onShowContactClicked }>
            <FontAwesomeIcon icon={ faEnvelope } size="2x"/>
        </button>
    </div>
}

type INavigationProps = {
    onHideMenuClicked: () => void
    show: boolean
}

const Navigation = ({ show, onHideMenuClicked }: INavigationProps) => {
    return <nav className={ `${show ? active : undefined}` }>
        <button onClick={ onHideMenuClicked }>
            <FontAwesomeIcon icon={ faTimes } size="2x"/>
        </button>
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
            <Navigation
                onHideMenuClicked={ () => setShow(false) }
                show={ show }
            />
            <NavigationBar
                onShowContactClicked={ () => setShow(true) }
                onShowMenuClicked={ () => setShow(true) }
                title={ data.site.siteMetadata.title }
            />
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
