import { graphql } from "gatsby"
import * as React from "react"

import Post from "../../components/post"
import Layout from "../../components/layout"

import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    postEntry: {
        h2: {
            marginBottom: 0,
            paddingBottom: 0,
        },
    },
}, {
    name: "BlogIndex",
})

const BlogPage = ({ data }: IBlogPostsQueryData) => {
    const style = useStyles()
    return <Layout pageTitle="My Blog Posts">
        <h1>Blog</h1>
        {data.allMdx.nodes.map(node => (
            <div className={ style.postEntry } key={ node.id }>
                <Post post={ node }/>
            </div>
        ))}
    </Layout>
}

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
