import { graphql, Link } from "gatsby"
import * as React from "react"

import Layout from "../../components/layout"

import {
    blog,
} from "./blog.module.scss"

const BlogPage = ({ data }: IBlogPostsQueryData) => (
    <Layout pageTitle="My Blog Posts">
        <h1>Blog</h1>
        {data.allMdx.nodes.map(node => (
            <article className={ blog } key={ node.id }>
                <h2><Link to={ `/blog/${node.slug}` }>{ node.frontmatter.title }</Link></h2>
                Posted: { node.frontmatter.date }
            </article>
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
