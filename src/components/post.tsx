import { Link } from "gatsby"

import * as React from "react"
import { createUseStyles } from "react-jss"

type IPostProps = {
    post: IBlogPostEntryData
}

const useStyles = createUseStyles({
    postEntry: {
        h2: {
            marginBottom: 0,
            paddingBottom: 0,
        },
    },
})

const Post = ({ post }: IPostProps) => {
    const classes = useStyles()
    return <article className={ classes.postEntry } key={ post.id }>
        <h2>
            <Link to={ `/blog/${post.slug}` }>
                { post.frontmatter.title }
            </Link>
        </h2>
        Posted: { post.frontmatter.date }
    </article>
}

export default Post
