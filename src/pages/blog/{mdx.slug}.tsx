import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import * as React from "react"

import Layout from "../../components/layout"

const BlogPost = ({ data }: IBlogPostQueryData) => {
    return (
        <Layout pageTitle={ data.mdx.frontmatter.title }>
            <p>{ data.mdx.frontmatter.date } </p>
            <MDXRenderer>
                { data.mdx.body }
            </MDXRenderer>
        </Layout>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            frontmatter {
                date(formatString: "D MMMM, YYYY")
                title
            }
            body
        }
    }
`

export default BlogPost
