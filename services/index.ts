import { gql, request } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async (): Promise<IResponsePost[]> => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const response = await request(graphqlAPI, query);

    return response.postsConnection.edges as IResponsePost[];
};

export const getPostDetails = async (slug: string): Promise<IPostDetails> => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
        }
    `;

    const response = await request(graphqlAPI, query, { slug });

    return response.post as IPostDetails;
};

export const getRecentPosts = async (): Promise<IPost[]> => {
    const query = gql`
        query GetPostDetails(){
            posts(
                orderBy: createdAt_ASC,
                last: 3
            ){
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const response = await request(graphqlAPI, query);

    return response.posts as IPost[];
};

export const getCategoryPost = async (slug): Promise<IResponsePost[]> => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: { categories_some: { slug: $slug } }) {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges as IResponsePost[];
};

export const getSimilarPosts = async ({
    categories,
    slug,
}: {
    categories: string[];
    slug: string;
}): Promise<IPost[]> => {
    console.log({ categories, slug });

    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {
                    slug_not: $slug
                    AND: { categories_some: { slug_in: $categories } }
                }
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const response = await request(graphqlAPI, query, { slug, categories });

    return response.posts as IPost[];
};

export const getCategories = async (): Promise<ICategory[]> => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;

    const response = await request(graphqlAPI, query);

    return response.categories as ICategory[];
};

export const submitComment = async (obj: IComment) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });

    return result.json();
};

export const getComments = async (slug: string): Promise<IComment[]> => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post: { slug: $slug } }) {
                name
                createdAt
                comment
            }
        }
    `;

    const response = await request(graphqlAPI, query, { slug });

    return response.comments as IComment[];
};
