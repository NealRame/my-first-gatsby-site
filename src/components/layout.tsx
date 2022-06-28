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
    faGithubAlt,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons"

import {
    active,
    content,
    navbar,
    navlinks,
    siteLinks,
    socialLinks,
} from "./layout.module.scss"

import "../style/global.scss"


type INavigationBarProps = {
    onToggleMenuClicked: () => void
    onToggleContactClicked: () => void
    title: string
}

const NavigationBar = ({
    onToggleMenuClicked,
    onToggleContactClicked,
    title,
}: INavigationBarProps) => {
    return <div className={ navbar }>
        <button onClick={ onToggleMenuClicked }>
            <FontAwesomeIcon icon={ faBars } size="2x" fixedWidth/>
        </button>
        <h1>{ title }</h1>
        <button onClick={ onToggleContactClicked }>
            <FontAwesomeIcon icon={ faEnvelope } size="2x" fixedWidth/>
        </button>
    </div>
}

type INavigationListProps = {
    children: React.ReactNode
    isOpened: boolean
    onCloseClicked: () => void
}

const NavigationList = ({ isOpened, children, onCloseClicked }: INavigationListProps) => {
    return <div className={[navlinks, isOpened ? active : ""].join(" ")}>
        <button onClick={ onCloseClicked }>
            <FontAwesomeIcon icon={ faXmark } size="3x" fixedWidth/>
        </button>
        { children }
    </div>
}

type INavigationProps = {
    title: string
}

const Navigation = ({ title }: INavigationProps) => {
    const [ isOpened, setIsOpened] = React.useState(false)

    const [siteLinksActive, setSiteLinksActive] = React.useState(false)
    const [socialLinksActive, setSocialLinksActive] = React.useState(false)

    return <nav className={ `${isOpened ? active : ""}` }>
        <NavigationBar
            title={ title }
            onToggleMenuClicked={ () => setSiteLinksActive(true) }
            onToggleContactClicked={ () => setSocialLinksActive(true) }
        />

        <NavigationList
            isOpened={ siteLinksActive }
            onCloseClicked={ () => setSiteLinksActive(false) }>
            <ul id={ siteLinks }>
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
        </NavigationList>

        <NavigationList
            isOpened={ socialLinksActive }
            onCloseClicked={ () => setSocialLinksActive(false) }>
            <ul id={ socialLinks }>
                <li>
                    <a href="https://github.com/NealRame" target="_blank">
                        <FontAwesomeIcon icon={ faGithubAlt } fixedWidth/>
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/NealRame" target="_blank">
                        <FontAwesomeIcon icon={ faTwitter } fixedWidth/>
                    </a>
                </li>
            </ul>
        </NavigationList>
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
