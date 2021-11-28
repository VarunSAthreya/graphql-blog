import { FunctionComponent, ReactNode } from 'react';
import Header from './Header';

type Props = {
    children: ReactNode | ReactNode[];
};

const Layout: FunctionComponent<Props> = ({ children }: Props) => (
    <>
        <Header />
        {children}
    </>
);

export default Layout;
