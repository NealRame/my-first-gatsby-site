import type { GatsbyConfig } from "gatsby"
import * as dotenv from "dotenv"

dotenv.config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Neal.Rame.",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-jss",
    "gatsby-plugin-mdx",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    }, {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        }
      }
    }, {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/blog`,
      }
    },
  ],
}

export default config
