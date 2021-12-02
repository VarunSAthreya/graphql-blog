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
        raw: string;
    };
}

interface IResponsePost {
    cursor: string;
    node: IPost;
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
