import { format } from 'date-fns';
import parse from 'html-react-parser';
import { FunctionComponent, useEffect, useState } from 'react';
import { getComments } from '../services';

type Props = {
    slug: string;
};

const Comments: FunctionComponent<Props> = ({ slug }: Props) => {
    const [comments, setComments] = useState<IResponseComment[]>([]);

    useEffect(() => {
        getComments(slug)
            .then((result) => setComments(result))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            {comments.length > 0 && (
                <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
                    <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
                        {comments.length} Comments
                    </h3>
                    {comments.map((comment) => (
                        <div
                            key={comment.createdAt}
                            className="pb-4 mb-4 border-b border-grey-100"
                        >
                            <p className="mb-4">
                                <span className="font-semibold">
                                    {comment.name}
                                </span>{' '}
                                on{' '}
                                {format(
                                    new Date(comment.createdAt),
                                    'MMM dd, yyyy'
                                )}
                            </p>
                            <p className="w-full whitespace-pre-line text-grey-600">
                                {parse(comment.comment)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Comments;
