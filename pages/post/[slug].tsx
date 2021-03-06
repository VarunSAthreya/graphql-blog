import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import {
    Author,
    Categories,
    Comments,
    CommentsForm,
    Loader,
    PostDetail,
    PostWidget,
} from '../../components';
import { AdjacentPosts } from '../../sections';
import { getPostDetails, getPosts } from '../../services';

type Props = {
    post: IPostDetails;
};

const PostDetails: NextPage<Props> = ({ post }: Props) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }
    return (
        <>
            <div className="container px-10 mx-auto mb-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-8">
                        <PostDetail post={post} />
                        <Author author={post.author} />
                        <AdjacentPosts
                            slug={post.slug}
                            createdAt={post.createdAt}
                        />
                        <CommentsForm slug={post.slug} />
                        <Comments slug={post.slug} />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <PostWidget
                                slug={post.slug}
                                categories={post.categories.map(
                                    (category) => category.slug
                                )}
                            />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetails;

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getPosts();

    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx: {
    params?: ParsedUrlQuery;
}) => {
    const data = await getPostDetails(ctx.params.slug.toString());

    return {
        props: { post: data },
    };
};
