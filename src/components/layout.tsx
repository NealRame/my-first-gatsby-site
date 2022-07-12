import { graphql, Link, useStaticQuery } from "gatsby"

import * as React from "react"
import { Helmet } from "react-helmet"

import {
    faGithubAlt,
    faInstagram,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons"

import {
    faBars,
    faEnvelope,
    faXmark,
} from "@fortawesome/free-solid-svg-icons"

import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome"

import {
    FadeOut,
    Reveal,
} from "./effects"

import {
    content,
    navbar,
    navlinks,
    site,
    social,
} from "./layout.module.scss"

import "../style/global.scss"


type INavigationBarProps = {
    onSiteLinksMenuButtonClicked: () => void
    onSocialLinksMenuButtonClicked: () => void

    siteLinksMenuActive: boolean
    socialLinksMenuActive: boolean

    title: string
}

const NavigationBar = ({
    onSiteLinksMenuButtonClicked,
    onSocialLinksMenuButtonClicked,
    siteLinksMenuActive,
    socialLinksMenuActive,
    title,
}: INavigationBarProps) => {
    const duration = 300

    return <div className={ navbar }>
        <button onClick={ onSiteLinksMenuButtonClicked }>
            <FontAwesomeIcon
                icon={ siteLinksMenuActive ? faXmark : faBars }
                size="2x"
                fixedWidth
            />
        </button>
        <FadeOut
            duration={ duration }
            enter={ siteLinksMenuActive || socialLinksMenuActive }>
            <h1>{ title }</h1>
        </FadeOut>
        <button onClick={ onSocialLinksMenuButtonClicked }>
            <FontAwesomeIcon
                icon={ socialLinksMenuActive ? faXmark : faEnvelope }
                size="2x"
                fixedWidth
            />
        </button>
    </div>
}

type INavigationListProps = {
    children: React.ReactNode
    onActivated: () => void
    onDeactivated: () => void
    isOpened: boolean
    menu: "site" | "social"
}

const NavigationList = ({
    children,
    isOpened,
    menu,
}: INavigationListProps) => {
    const duration = 300;
    const menuClass = { site, social }

    return <Reveal
        duration={ duration }
        enter={ isOpened }
        classNames={ [navlinks, menuClass[menu]] }
    >{ children }</Reveal>
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

    return <nav>
        <NavigationBar
            onSiteLinksMenuButtonClicked={ toggleSiteLinks }
            onSocialLinksMenuButtonClicked={ toggleSocialLinks }
            siteLinksMenuActive={ siteLinksActive }
            socialLinksMenuActive={ socialLinksActive }
            title={ title }
        />

        <NavigationList
            isOpened={ siteLinksActive }
            menu="site"
            onActivated={ () => {} }
            onDeactivated={ () => {} }
        >
            <ul>
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

        <NavigationList
            isOpened={ socialLinksActive }
            menu="social"
            onActivated={ () => {} }
            onDeactivated={ () => {} }
        >
            <ul>
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
