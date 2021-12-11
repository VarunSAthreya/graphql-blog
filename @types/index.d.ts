interface IPost {
    author: IAuthor;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: {
        url: string;
    };
    categories: ICategory[];
}

interface IPostDetails extends IPost {
    content: {
        raw: {
            children: [
                {
                    children: [
                        {
                            text: string;
                            bold?: boolean;
                            italic?: boolean;
                            underline?: boolean;
                        }
                    ];
                    type: string;
                }
            ];
        };
    };
}

interface IResponsePost {
    cursor: string;
    node: IPost;
}

interface IAdjacentPost {
    next: IPost;
    previous: IPost;
}

interface ICategory {
    name: string;
    slug: string;
}

interface IAuthor {
    bio: string;
    id: string;
    name: string;
    photo: {
        url: string;
    };
}

interface IComment {
    slug: string;
    name: string;
    email: string;
    comment: string;
}

interface IResponseComment extends IComment {
    createdAt: string;
}
