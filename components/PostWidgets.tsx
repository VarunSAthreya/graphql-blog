import { format } from 'date-fns';
import Link from 'next/link';
import { FunctionComponent, useEffect, useState } from 'react';
import { getRecentPosts, getSimilarPosts } from '../services';

type Props = {
    categories?: string[];
    slug?: string;
};

const PostWidgets: FunctionComponent<Props> = ({ categories, slug }: Props) => {
    const [relatedPosts, setRelatedPosts] = useState<IPost[]>([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts({ categories, slug })
                .then((data) => setRelatedPosts(data))
                .catch((error) => {
                    console.log(error);
                });
        } else {
            getRecentPosts()
                .then((data) => setRelatedPosts(data))
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [slug]);

    return (
        <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
            <h3 className="mb-8 text-xl font-semibold border-b pb 4">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className="flex items-center w full">
                    <div className="flex-none w-16">
                        <img
                            src={post.featuredImage.url}
                            alt={post.title}
                            height="60px"
                            width="60px"
                            className="align-middle rounded-full"
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-xs text-gray-500">
                            {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                        </p>
                        <Link href={`/post/${post.slug}`}>
                            <a className="text-md">{post.title}</a>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidgets;
