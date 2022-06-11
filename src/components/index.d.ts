declare module "*.css"
interface ILayoutData {
    pageTitle: string
    children: React.ReactNode
}

interface IBlogPostData {
    name: string
}
interface IBlogPostsQueryData {
    data: {
        allFile: {
            nodes: Array<IBlogPostData>
        }
    }
}
