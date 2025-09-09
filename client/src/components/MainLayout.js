import React from 'react';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import FooterComponent from './FooterComponent/FooterComponent';

const MainLayout = ({children}) => {
    return (
        <>
            <HeaderComponent />
                <main>{children}</main>
            <FooterComponent />
        </>
    );
};

export default MainLayout;