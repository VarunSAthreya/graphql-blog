import { gql, request } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
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

    return response.postsConnection.edges;
};

export const getRecentPost = async () => {
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

    return response.posts;
};
