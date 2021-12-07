import { gql, GraphQLClient } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function commentHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });

    const { name, email, comment, slug } = req.body;

    const query = gql`
        mutation CreateComment(
            $name: String!
            $email: String!
            $comment: String!
            $slug: String!
        ) {
            createComment(
                data: {
                    name: $name
                    email: $email
                    comment: $comment
                    post: { connect: { slug: $slug } }
                }
            ) {
                id
            }
        }
    `;

    const result = await graphQLClient.request(query, {
        name,
        email,
        comment,
        slug,
    });

    return res.status(200).send(result);
}
