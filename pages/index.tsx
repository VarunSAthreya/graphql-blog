import { NextPage } from 'next';
import { Categories, PostCard, PostWidgets } from '../components';

const posts: IPost[] = [
    {
        title: 'React Testing',
        excerpt:
            'React Testing is a collection of React testing tools and libraries.',
    },
    {
        title: 'React tailwind',
        excerpt: 'React And tailwind tutorials',
    },
    {
        title: 'Next Testing',
        excerpt: 'NextJS testing',
    },
];

const Home: NextPage = () => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts.map((post, index) => (
                        <PostCard post={post} key={index} />
                    ))}
                </div>
                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
                        <PostWidgets />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
