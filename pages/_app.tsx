import { NextPage } from 'next';
import { AppProps } from 'next/dist/shared/lib/router/router';
import 'tailwindcss/tailwind.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default MyApp;
