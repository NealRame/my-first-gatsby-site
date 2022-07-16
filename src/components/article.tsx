import { Link } from "gatsby"
import * as React from 'react'

import {
    blog,
} from "./blog.module.scss"

type IArticleEntryProps = {
    post: IBlogPostEntryData
}

const ArticleEntry = ({ post }: IArticleEntryProps) => {
    return <article className={ blog } key={ post.id }>
        <h2>
            <Link to={ `/blog/${post.slug}` }>
                { post.frontmatter.title }
            </Link>
        </h2>
        Posted: { post.frontmatter.date }
    </article>
}

export default ArticleEntry
