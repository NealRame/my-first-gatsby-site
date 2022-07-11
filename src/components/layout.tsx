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
    faInstagram,
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
    contactIsOpened: boolean
    onToggleContactClicked: () => void

    menuIsOpened: boolean
    onToggleMenuClicked: () => void

    children: React.ReactNode
}

const NavigationBar = ({
    menuIsOpened,
    onToggleMenuClicked,
    contactIsOpened,
    onToggleContactClicked,
    children,
}: INavigationBarProps) => {
    return <div className={ navbar }>
        <button onClick={ onToggleMenuClicked }>
            <FontAwesomeIcon
                icon={ menuIsOpened ? faXmark : faBars }
                size="2x"
                fixedWidth
            />
        </button>
        { children }
        <button onClick={ onToggleContactClicked }>
            <FontAwesomeIcon
                icon={ contactIsOpened ? faXmark : faEnvelope }
                size="2x"
                fixedWidth
            />
        </button>
    </div>
}

type INavigationListProps = {
    children: React.ReactNode
    isOpened: boolean
}

const NavigationList = ({ isOpened, children }: INavigationListProps) => {
    return <div className={[navlinks, isOpened ? active : ""].join(" ")}>
        { children }
    </div>
}

type INavigationProps = {
    title: string
}

const Navigation = ({ title }: INavigationProps) => {
    const [siteLinksActive, setSiteLinksActive] = React.useState(false)
    const [socialLinksActive, setSocialLinksActive] = React.useState(false)

    const toggleSiteLinks = () => {
        if (siteLinksActive) {
            setSiteLinksActive(false)
        } else {
            setSiteLinksActive(true)
            setSocialLinksActive(false)
        }
    }

    const toggleSocialLinks = () => {
        if (socialLinksActive) {
            setSocialLinksActive(false)
        } else {
            setSiteLinksActive(false)
            setSocialLinksActive(true)
        }
    }

    const mode = () => {
        if (siteLinksActive) {
            return "site"
        }
        if (socialLinksActive) {
            return "social"
        }
        return "none"
    }

    return <nav className={(siteLinksActive || socialLinksActive) ? active : ""}>
        <NavigationBar
            menuIsOpened={ siteLinksActive }
            onToggleMenuClicked={ toggleSiteLinks }
            contactIsOpened={ socialLinksActive }
            onToggleContactClicked={ toggleSocialLinks }
        ><h1>{ title }</h1></NavigationBar>

        <NavigationList isOpened={ siteLinksActive }>
            <ul id={ siteLinks }>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about/">About Me</Link>
                </li>
                <li>
                    <Link to="/blog/">Blog</Link>
                </li>
            </ul>
        </NavigationList>

        <NavigationList isOpened={ socialLinksActive }>
            <ul id={ socialLinks }>
                <li>
                    <a href="https://github.com/NealRame" target="_blank">
                        <FontAwesomeIcon icon={ faGithubAlt } size="2x" fixedWidth/>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/nealrame/" target="_blank">
                        <FontAwesomeIcon icon={ faInstagram } size="2x" fixedWidth/>
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/NealRame" target="_blank">
                        <FontAwesomeIcon icon={ faTwitter } size="2x" fixedWidth/>
                    </a>
                </li>
            </ul>
        </NavigationList>
    </nav>
}

const Layout = ({ children, pageTitle }: ILayoutData) => {
    const { site: { siteMetadata: { title } }} = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
    <div id={ content }>
        <Helmet>
            <title>{ `${title} - ${pageTitle}` }</title>
        </Helmet>
        <header>
            <Navigation title={ title }/>
        </header>
        <main>
            { children }
        </main>
    </div>)
}

export default Layout
