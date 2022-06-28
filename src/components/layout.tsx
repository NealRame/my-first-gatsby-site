import { graphql, Link, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"

import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    faBars,
    faEnvelope,
    faXmark,
} from "@fortawesome/free-solid-svg-icons"

import {
    active,
    content,
    navbar,
} from "./layout.module.scss"

import "../style/global.scss"


type INavigationBarProps = {
    onToggleMenuClicked: () => void
    onToggleContactClicked: () => void
    active: boolean
    title: string
}

const NavigationBar = ({
    onToggleMenuClicked,
    onToggleContactClicked,
    active,
    title,
}: INavigationBarProps) => {
    return <div className={ navbar }>
        <button onClick={ onToggleMenuClicked }>
            <FontAwesomeIcon icon={ active ? faXmark : faBars } size="2x" fixedWidth/>
        </button>
        <h1>{ title }</h1>
        <button onClick={ onToggleContactClicked }>
            <FontAwesomeIcon icon={ faEnvelope } size="2x" fixedWidth/>
        </button>
    </div>
}

type INavigationProps = {
    title: string
}

const Navigation = ({ title }: INavigationProps) => {
    const [ isOpened, setIsOpened] = React.useState(false)
    return <nav className={ `${isOpened ? active : ""}` }>
        <NavigationBar
            active={ isOpened }
            title={ title }
            onToggleMenuClicked={ () => setIsOpened(!isOpened) }
            onToggleContactClicked={ () => {} }
        />
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
            <Navigation title={ data.site.siteMetadata.title }/>
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
