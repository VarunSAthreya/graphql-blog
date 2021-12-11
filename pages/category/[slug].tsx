import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { Categories, Loader, PostCard } from '../../components';
import { getCategories, getCategoryPost } from '../../services';

type Props = {
    posts: IResponsePost[];
};

const CategoryPost: NextPage<Props> = ({ posts }: Props) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post.node} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPost;

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await getCategories();
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx: {
    params?: ParsedUrlQuery;
}) => {
    const posts = await getCategoryPost(ctx.params.slug);

    return {
        props: { posts },
    };
};
