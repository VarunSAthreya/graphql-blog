import Link from 'next/link';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getCategories } from '../services';

const Categories: FunctionComponent = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        getCategories().then((newCategories) => setCategories(newCategories));
    }, []);

    return (
        <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
            <h3 className="mb-8 text-xl font-semibold border-b pb 4">
                Categories
            </h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className="block pb-3 mb-3 cursor-pointer">
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default Categories;
