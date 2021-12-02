import { gql, request } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async (): Promise<IResponsePost> => {
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

    return response.postsConnection.edges as IResponsePost;
};

export const getRecentPosts = async (): Promise<IResponsePost> => {
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

    return response.posts as IResponsePost;
};

export const getSimilarPosts = async ({
    categories,
    slug,
}: {
    categories: string;
    slug: string;
}): Promise<IResponsePost> => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {
                    slug_not: $slug
                    AND: { categories_some: $categories }
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

    const response = await request(graphqlAPI, query);

    return response.posts as IResponsePost;
};

export const getCategories = async (): Promise<ICategory> => {
    const query = gql`
        query GetCategories {
            categories: {
                name
                slug
            }
        }
    `;

    const response = await request(graphqlAPI, query);

    return response.categories as ICategory;
};
