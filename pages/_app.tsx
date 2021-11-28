import { NextPage } from 'next';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { Layout } from '../components';
import '../styles/global.scss';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default MyApp;
