declare module "*.css"
declare module "*.scss"

interface ILayoutData {
    pageTitle: string
    children: React.ReactNode
}

interface IBlogPostEntryData {
    frontmatter: {
        date: string
        title: string
    }
    id: string
    slug: string
}
interface IBlogPostsQueryData {
    data: {
        allMdx: {
            nodes: Array<IBlogPostEntryData>
        }
    }
}

interface IBlogPostQueryData {
    data: {
        mdx: {
            frontmatter: {
                date: string
                title: string
            }
            body: string
        }
    }
}

interface IShoppingListData {
    name: string
}
