import Link from 'next/link';
import { FunctionComponent, useEffect, useState } from 'react';
import { getCategories } from '../services';

const Header: FunctionComponent = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        getCategories().then((newCategories) => setCategories(newCategories));
    }, []);

    return (
        <div className="container px-10 mx-auto mb-8">
            <div className="inline-block w-full py-8 border-b border-gray-400">
                <div className="block md:float-left">
                    <Link href="/">
                        <span className="text-4xl font-bold text-white cursor-pointer">
                            GraphQL Blog
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category) => (
                        <Link
                            href={`/category/${category.slug}`}
                            key={category.slug}
                        >
                            <span className="mt-2 ml-4 font-semibold text-white align-middle cursor-pointer md:float-right">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
