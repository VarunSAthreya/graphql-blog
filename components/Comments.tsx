import { format } from 'date-fns';
import parse from 'html-react-parser';
import { FunctionComponent, useEffect, useState } from 'react';
import { getComments } from '../services';

type Props = {
    slug: string;
};

const Comments: FunctionComponent<Props> = ({ slug }: Props) => {
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        getComments(slug)
            .then((result) => setComments(result))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            {comments.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                    <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                        {comments.length} Comments
                    </h3>
                    {comments.map((comment) => (
                        <div
                            key={comment.createdAt}
                            className="border-b border-grey-100 mb-4 pb-4"
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
                            <p className="whitespace-pre-line text-grey-600 w-full">
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
