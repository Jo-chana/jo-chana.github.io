import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { HEADER_HEIGHT } from '../lib/guideline/layout';
import { useIsDesktop, useIsMobile } from '../lib/hooks';
import {
    getFlexStyle, getScreenHeight, paddingHorizontal, useContainerPadding,
} from '../lib/style';
import { ABOUT_SCROLL_HEIGHT } from '../pages/main/about';
import { HOME_SCROLL_HEIGHT } from '../pages/main/home';
import { WORKS_SCROLL_HEIGHT } from '../pages/main/works';
import { selectPage } from '../store/page';
import { SidebarButton } from './sidebar';
import { CText } from './text';

export default function Header() {

    const padding = useContainerPadding();
    const page = useSelector(selectPage);
    const dark = page === 'works';
    const isMobile = useIsMobile();
    const isDesktop = useIsDesktop();

    const handleHomeClick = useCallback(() => {
        window.scrollTo({ top: 0})
    }, [])

    const handleAboutClick = useCallback(() => {
        const offsetTop = ABOUT_SCROLL_HEIGHT * 5 / 4 + HOME_SCROLL_HEIGHT;
        window.scrollTo({ top: offsetTop })
    }, []);

    const handleWorkClick = useCallback(() => {
        const offsetTop = ABOUT_SCROLL_HEIGHT + HOME_SCROLL_HEIGHT + WORKS_SCROLL_HEIGHT;
        window.scrollTo({ top: offsetTop })
    }, []);

    const handleContactClick = useCallback(() => {
        const offsetTop = ABOUT_SCROLL_HEIGHT + HOME_SCROLL_HEIGHT + WORKS_SCROLL_HEIGHT + getScreenHeight() * 10;
        window.scrollTo({ top: offsetTop })
    }, []);

    return <div style={ { 
        width: '100%',
        height: HEADER_HEIGHT,
        backgroundColor: 'transparent',
        position: 'fixed',
        top: 0,
        zIndex: 5,
        ...paddingHorizontal(padding),
        ...getFlexStyle('space-between'),
    } }>
        <div style={ getFlexStyle('flex-start', 32)}>
            { !isDesktop && <SidebarButton /> }
            { !isMobile && <>
                <div style={ getFlexStyle('flex-start', 24)}>
                    <div onClick={ handleHomeClick }>
                        <CText dark={ dark } size="small" msg="HOME" />
                    </div>
                    <div onClick={ handleAboutClick }>
                        <CText dark={ dark } size="small" msg="ABOUT" />
                    </div>
                    <div onClick={ handleWorkClick }>
                        <CText dark={ dark } size="small" msg="WORKS" />
                    </div>
                    <div onClick={ handleContactClick }>
                        <CText dark={ dark } size="small" msg="CONTACT" />
                    </div>
                </div>
            </>
            }
        </div>
    </div>;
}