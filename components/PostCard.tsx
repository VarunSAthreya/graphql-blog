import { FunctionComponent } from 'react';

type Props = {
    post: IPost;
};

const PostCard: FunctionComponent<Props> = ({ post }: Props) => {
    return (
        <div>
            {post.title}
            {post.excerpt}
        </div>
    );
};

export default PostCard;
