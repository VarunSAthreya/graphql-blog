import { format } from 'date-fns';
import { Fragment, FunctionComponent } from 'react';

type Props = {
    post: IPostDetails;
};

const PostDetail: FunctionComponent<Props> = ({ post }: Props) => {
    const getContentFragment = (
        index: number,
        text: any,
        obj?: any,
        type?: string
    ) => {
        let modifiedText: (string | JSX.Element)[] = text;

        if (obj) {
            if (obj.bold) {
                modifiedText = [<b key={index}>{text}</b>];
            }

            if (obj.italic) {
                modifiedText = [<em key={index}>{text}</em>];
            }

            if (obj.underline) {
                modifiedText = [<u key={index}>{text}</u>];
            }
        }

        switch (type) {
            case 'heading-three':
                return (
                    <h3 key={index} className="mb-4 text-xl font-semibold">
                        {modifiedText.map((item, i) => (
                            <Fragment key={i}>{item}</Fragment>
                        ))}
                    </h3>
                );
            case 'paragraph':
                return (
                    <p key={index} className="mb-8">
                        {modifiedText.map((item, i) => (
                            <Fragment key={i}>{item}</Fragment>
                        ))}
                    </p>
                );
            case 'heading-four':
                return (
                    <h4 key={index} className="mb-4 font-semibold text-md">
                        {modifiedText.map((item, i) => (
                            <Fragment key={i}>{item}</Fragment>
                        ))}
                    </h4>
                );
            case 'image':
                return (
                    <img
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                    />
                );
            default:
                return modifiedText;
        }
    };

    return (
        <div className="pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
            <div className="relative mb-6 overflow-hidden shadow-md">
                <img
                    src={post.featuredImage.url}
                    alt={post.title}
                    className="object-top w-full h-full rounded-t-lg"
                />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex items-center w-full mb-8">
                    <div className="flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto">
                        <img
                            src={post.author.photo.url}
                            alt={post.author.name}
                            height="30px"
                            width="30px"
                            className="align-middle rounded-full"
                        />
                        <p className="inline ml-2 text-lg text-gray-700 align-middle">
                            {post.author.name}
                        </p>
                    </div>
                    <div className="font-medium text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline w-6 h-6 mr-2 text-pink-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="align-middle">
                            {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                        </span>
                    </div>
                </div>
                <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
                {post.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) =>
                        getContentFragment(itemIndex, item.text)
                    );

                    return getContentFragment(
                        index,
                        children,
                        typeObj,
                        typeObj.type
                    );
                })}
            </div>
        </div>
    );
};

export default PostDetail;
