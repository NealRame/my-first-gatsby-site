declare module "*.css"
interface ILayoutData {
    pageTitle: string
    children: React.ReactNode
}

interface IBlogPostData {
    frontmatter: {
        date: string
        title: string
    }
    id: string
    body: string
}
interface IBlogPostsQueryData {
    data: {
        allMdx: {
            nodes: Array<IBlogPostData>
        }
    }
}
