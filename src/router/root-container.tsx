import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Footer from '../components/footer';
import Header from '../components/header';
import { SIDEBAR_WIDTH, SidebarContainer } from '../components/sidebar';
import { useIsDesktop } from '../lib/hooks';
import { useColor } from '../lib/style';
import { selectPage } from '../store/page';
import { Routes } from './routes';

const BACKGROUND_COLOR_MAP = {
    'home': 'background2',
    'about': 'primary',
    'works': 'point1',
    'contact': 'point1',
}

export default function RootContainer() {

    const page = useSelector(selectPage);
    const color = useColor();
    //@ts-ignore
    const backgroundColor = color[BACKGROUND_COLOR_MAP[page]];
    const isDesktop = useIsDesktop();
    
    return <BrowserRouter>
        <div style={ {
            minHeight: '100vh',
            backgroundColor,
            paddingLeft: isDesktop ? SIDEBAR_WIDTH : undefined,
        } }>
            <Header />
            {
                Routes.map(it => 
                    <Route 
                        key={ it.name } 
                        exact={ it.exact ?? false } 
                        path={ it.path } 
                        component={ it.component } />
                )
            }
            <Footer />
            <SidebarContainer />
        </div>
    </BrowserRouter>
}