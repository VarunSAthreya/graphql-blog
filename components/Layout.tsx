import Head from 'next/head';
import { FunctionComponent, ReactNode } from 'react';
import Header from './Header';

type Props = {
    children: ReactNode | ReactNode[];
    title: string;
};

const Layout: FunctionComponent<Props> = ({ children, title }: Props) => (
    <>
        <Head>
            <title>{title}</title>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
            />
        </Head>
        <Header />
        {children}
    </>
);

export default Layout;
