import { Link } from "gatsby"

import * as React from "react"

type IPostProps = {
    post: IBlogPostEntryData
}

const Post = ({ post }: IPostProps) => {
    return <article key={ post.id }>
        <h2>
            <Link to={ `/blog/${post.slug}` }>
                { post.frontmatter.title }
            </Link>
        </h2>
        Posted: { post.frontmatter.date }
    </article>
}

export default Post
