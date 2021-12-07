import { FunctionComponent, useRef, useState } from 'react';
import { submitComment } from '../services';

type Props = {
    slug: string;
};

const CommentsForm: FunctionComponent<Props> = ({ slug }: Props) => {
    const [error, setError] = useState<boolean>(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] =
        useState<boolean>(false);

    const commentEl = useRef(null);
    const nameEl = useRef(null);
    const emailEl = useRef(null);
    const storeDataEl = useRef(null);

    const handleCommentSubmission = () => {
        setError(false);

        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storeDataEl.current;

        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj: IComment = {
            name,
            email,
            comment,
            slug,
        };

        if (storeData) {
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('name', name);
            localStorage.removeItem('email', email);
        }

        submitComment(commentObj).then((res) => {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        });
    };

    return (
        <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
            <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
                CommentsForm
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea
                    ref={commentEl}
                    className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Comment"
                    name="comment"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
                <input
                    type="text"
                    ref={nameEl}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Name"
                    name="name"
                />
                <input
                    type="email"
                    ref={emailEl}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="container">
                    <input
                        type="checkbox"
                        ref={storeDataEl}
                        id="storeData"
                        name="storeData"
                        value="true"
                    />
                    <label
                        className="ml-2 text-gray-500 cursor-pointer"
                        htmlFor="storeData"
                    >
                        Save my E-mail and Name for the next time I comment.
                    </label>
                </div>
            </div>
            {error && (
                <p className="text-xs text-red-500">
                    * All fields are required
                </p>
            )}
            <div className="mt-8">
                <button
                    type="button"
                    onClick={handleCommentSubmission}
                    className="inline-block px-8 py-3 text-lg text-white transition bg-pink-600 rounded-full cursor-pointer hover:bg-indigo-900 duration-599 ease"
                >
                    Post Comment
                </button>
                {showSuccessMessage && (
                    <span className="float-right mt-3 text-xl font-semibold text-green-500">
                        Comment Submitted for Review
                    </span>
                )}
            </div>
        </div>
    );
};

export default CommentsForm;
