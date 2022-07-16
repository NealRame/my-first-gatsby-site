import { graphql, Link } from "gatsby"
import * as React from "react"

import Layout from "../../components/layout"
import ArticleEntry from "../../components/article"

const BlogPage = ({ data }: IBlogPostsQueryData) => (
    <Layout pageTitle="My Blog Posts">
        <h1>Blog</h1>
        {data.allMdx.nodes.map(node => (
            <ArticleEntry post={ node } key={ node.id }/>
        ))}
    </Layout>
)

export const query = graphql`
    query {
        allMdx(sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    title
                }
                id
                slug
            }
        }
    }
`

export default BlogPage
