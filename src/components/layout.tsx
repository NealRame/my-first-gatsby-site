import { graphql, Link, useStaticQuery } from "gatsby"

import Color from "color"

import * as React from "react"
import { Helmet } from "react-helmet"
import { createUseStyles } from "react-jss"

import {
    faGithubAlt,
    faInstagram,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons"

import {
    faBars,
    faEnvelope,
    faXmark
} from "@fortawesome/free-solid-svg-icons"

import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome"

import {
    FadeOut,
    Reveal
} from "./effects"

const Breakpoints = {
    small: 640,
    medium: 768,
    large: 1024,
    xlarge: 1280,
    xxlarge: 1440,
} as const

type IMediaQueryBreakpoint = keyof typeof Breakpoints
type IMediaQueryTypes = "screen" | "print" | "speech" | "tv" | "embedded" | "projection" | "handheld" | "braille" | "aural" | "all"

function mediaQuery(
    breakpoint: IMediaQueryBreakpoint,
    type: IMediaQueryTypes = "screen"
) {
    return `@media ${type} and (min-width: ${Breakpoints[breakpoint]}px)`
}

const color1 = Color("#0e0f10")
const color2 = Color("#5D6C75")
const color3 = Color("#FEFBEE")
const color4 = Color("#aff1fe")
const color5 = Color("#FA5C5C")

const backgroundColor = color1
const borderColor = color2
const foregroundColor = color3
const linkColor = color4
const headerColor = color2

const useStyles = createUseStyles({
    "@global": {
        "html": {
            fontSize: 18,
            [mediaQuery("medium")]: {
                fontSize: 21,
            }
        },
        "body": {
            backgroundColor: backgroundColor.hex(),
            color: foregroundColor.hex(),

            fontFamily: ["Rokkitt", "serif"],
            fontWeight: 18,

            margin: 0,
            padding: 0,
        },
        "h1, h2, h3, h4, h5, h6": {
            color: headerColor.hex(),

            fontFamily: ["Montserrat", "sans-serif"],
            fontWeight: 900,
        },
        "h1": {
            fontSize: "2rem",
            
            margin: ["2rem", 0, "2rem"],
            
            [mediaQuery("medium")]: {
                fontSize: "3rem",
                margin: ["3rem", 0, "2.5rem"],
            },
            [mediaQuery("large")]: {
                fontSize: "4rem",
            }
        },
        "h2": {
            fontSize: "1.5rem",
            
            margin: ["1rem", 0, "1rem"],

            [mediaQuery("medium")]: {
                fontSize: "2rem",

                margin: ["2rem", 0, "1.5rem"],
            },
            [mediaQuery("large")]: {
                fontSize: "3rem",
            }
        },
        "a": {
            color: linkColor.hex(),
            textDecoration: "none",
        }
    },
    layout: {
        backgroundColor: backgroundColor.hex(),

        "& > header > nav": {
            display: "grid",
            gridTemplateColumns: ["min-content", "100fr"],
            width: "100vw",
        },
        "& > main": {
            boxSizing: "border-box",

            margin: [0, "auto"],
            padding: [0, "1rem"],
    
            width: "100%",

            [mediaQuery("medium")]: {
                width: `${Breakpoints.medium}px`,
            },
            [mediaQuery("large")]: {
                width: `${Breakpoints.large}px`,
            },
        }
    },
    navigationBar: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",

        padding: ["1rem", "1rem", "1rem"],

        zIndex: 2,

        "& > h1": {
            color: color5.hex(),

            fontFamily: ["lores-9-wide", "sans-serif"],
            fontSize: "2rem",
            fontWeight: 900,

            margin: 0,

            textAlign: "center",
        }
    },
    navigationMenuButton: {
        backgroundColor: "transparent",
        border: "none",

        color: color3.hex(),

        cursor: "pointer",

        outline: "none",

        padding: 0,

        "&:focus": {
            color: linkColor.hex(),
        },
        "&:hover": {
            color: linkColor.hex(),
        },
    },
    navigationLinks: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",

        opacity: 0,

        zIndex: -1,

        "& > ul": {
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",

            fontFamily: ["lores-12", "sans-serif"],
            fontSize: "2rem",
            fontWeight: 900,

            listStyle: "none",

            padding: 0,
            margin: 0,

            minHeight: "100vh",

            "& > li > a": {
                color: foregroundColor.hex(),
                textTransform: "uppercase",
            }
        },

        "&#site": {
            backgroundColor: color2.hex(),
            "& > ul": {
                flexDirection: "column",
            }
        },

        "&#social": {
            backgroundColor: color5.hex(),
            "& > ul": {
                flexDirection: "row",
            }
        }
    }
})



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
    const classes = useStyles()

    return <div className={ classes.navigationBar }>
        <button
            className={ classes.navigationMenuButton }
            onClick={ onSiteLinksMenuButtonClicked }
        >
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
        <button
            className={ classes.navigationMenuButton }
            onClick={ onSocialLinksMenuButtonClicked }
        >
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
    const { navigationLinks } = useStyles()

    return <Reveal
        enter={ isOpened }
        duration={ duration }
    ><div id={ menu } className={ navigationLinks }>
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
            duration={ 400 }
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

    const classes = useStyles()

    return <>
        <Helmet>
            <title>{ `${title} - ${pageTitle}` }</title>
        </Helmet>
        <div className={ classes.layout }>
            <header>
                <Navigation title={ title }/>
            </header>
            <main>
                { children }
            </main>
        </div>
    </>

}

export default Layout
