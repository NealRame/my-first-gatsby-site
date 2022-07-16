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
    content,
    navbar,
    navlinks,
    site,
    social,
} from "./layout.module.scss"

import {
    FadeOut,
    Reveal,
    SlideUp,
} from "./effects"

import "../style/global.scss"


type INavigationBarProps = {
    children: React.ReactNode

    duration: number

    onSiteLinksMenuButtonClicked: () => void
    onSocialLinksMenuButtonClicked: () => void

    siteLinksMenuActive: boolean
    socialLinksMenuActive: boolean
}

const NavigationBar = ({
    children,
    duration,
    onSiteLinksMenuButtonClicked,
    onSocialLinksMenuButtonClicked,
    siteLinksMenuActive,
    socialLinksMenuActive,
}: INavigationBarProps) => {
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
            enter={ siteLinksMenuActive || socialLinksMenuActive}
        >{ children }</FadeOut>
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
    isOpened: boolean
    duration: number
    menu: "site" | "social"
}

const NavigationList = ({
    children,
    isOpened,
    duration,
    menu,
}: INavigationListProps) => {
    return <Reveal
        enter={ isOpened }
        duration={ duration }
    ><div id={ menu === "site" ? site : social } className={ navlinks }>
        { children }
    </div></Reveal>
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
            duration={ 400 }
            onSiteLinksMenuButtonClicked={ toggleSiteLinks }
            onSocialLinksMenuButtonClicked={ toggleSocialLinks }
            siteLinksMenuActive={ siteLinksActive }
            socialLinksMenuActive={ socialLinksActive }
        ><h1>{ title }</h1></NavigationBar>

        <NavigationList
            duration={ 1000 }
            isOpened={ siteLinksActive }
            menu="site"
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
            duration={ 400 }
            isOpened={ socialLinksActive }
            menu="social"
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
