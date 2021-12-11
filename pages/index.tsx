import { GetStaticProps, NextPage } from 'next';
import { Categories, PostCard, PostWidget } from '../components';
import { FeaturedPosts } from '../sections';
import { getPosts } from '../services';

type Props = {
    posts: IResponsePost[];
};

const Home: NextPage<Props> = ({ posts }: Props) => {
    return (
        <div className="container px-10 mx-auto mb-8">
            <FeaturedPosts />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post, index) => (
                        <PostCard post={post.node} key={index} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
    const posts: IResponsePost[] = (await getPosts()) || [];

    return {
        props: { posts },
    };
};
