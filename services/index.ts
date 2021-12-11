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

export const getComments = async (
    slug: string
): Promise<IResponseComment[]> => {
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

    return response.comments as IResponseComment[];
};

export const getFeaturedPosts = async (): Promise<IPost[]> => {
    const query = gql`
      query GetCategoryPost() {
        posts(where: {featuredPost: true}) {
          author {
            name
            photo {
              url
            }
          }
          featuredImage {
            url
          }
          title
          slug
          createdAt
        }
      }
    `;

    const result = await request(graphqlAPI, query);

    return result.posts as IPost[];
};

export const getAdjacentPosts = async (
    createdAt: Date,
    slug: string
): Promise<IAdjacentPost> => {
    const query = gql`
        query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
            next: posts(
                first: 1
                orderBy: createdAt_ASC
                where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
            previous: posts(
                first: 1
                orderBy: createdAt_DESC
                where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
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

    const result = await request(graphqlAPI, query, { slug, createdAt });

    return {
        next: result.next[0],
        previous: result.previous[0],
    } as IAdjacentPost;
};
