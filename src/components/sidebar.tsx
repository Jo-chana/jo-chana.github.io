import React, { CSSProperties, useCallback } from 'react';
import {
    AiFillGithub, AiFillInstagram, AiFillLinkedin, AiOutlineGlobal, AiOutlineMenu,
} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Sidebar from 'react-sidebar';

import Profile from '../images/profile.png';
import { useIsDesktop, useIsMobile } from '../lib/hooks';
import {
    getFlexStyle, getRoundStyle, getScreenHeight, paddingVertical, useColor, useFontColor,
} from '../lib/style';
import { ABOUT_SCROLL_HEIGHT } from '../pages/main/about';
import { HOME_SCROLL_HEIGHT } from '../pages/main/home';
import { WORKS_SCROLL_HEIGHT } from '../pages/main/works';
import { dispatch } from '../store';
import { selectPage } from '../store/page';
import { selectSidebar, sidebarClick } from '../store/sidebar';
import { ColorThemeSelector } from './color-theme';
import { CText } from './text';

export const SIDEBAR_WIDTH = 310;

const SIDEBAR_STYLE = {
    root: {
        position: undefined,
        zIndex: "20",
        innerWidth: 0,
    },
    sidebar: {
        position: "fixed",
        width: `${SIDEBAR_WIDTH}px`,
        height: "100vh",
        top: "0px",
        zIndex: "20",
    },
    content: {
        position: undefined,
        top: undefined,
        left: undefined,
        right: undefined,
        bottom: undefined
    },
}

export function SidebarButton({
    style,
}: {
    style?: CSSProperties;
}) {

    const handleClick = useCallback(() => dispatch(sidebarClick()), []);
    const isMobile = useIsMobile();
    const fontColor = useFontColor();
    const page = useSelector(selectPage);
    const color = page === 'works' ? fontColor.dark : fontColor.bright;

    const buttonStyle: CSSProperties = {
        // Add style for button which open sidebar
        width: 32,
        height: 32,
        borderRadius: 32,
        ...style,
    }

    if(isMobile)
        return <AiOutlineMenu onClick={ handleClick } size={ 32 }
            color={ color }/>

    return <img src={ Profile } onClick={ handleClick } 
        style={ buttonStyle } />
}

function SidebarComponent() {

    const color = useColor();
    const fontColor = useFontColor();
    const iconSize = 32;

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

    return <div style={{ 
        height: '100%',
        width: '100%',
        backgroundColor: color.background1,
        flexDirection: 'column',
        ...paddingVertical(100),
        ...getFlexStyle('flex-start', 12),
    }}>
        <img src={ Profile } style={ {
            ...getRoundStyle(150),
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.2)'} }/>
        <CText size="small" msg="@jochana" weight="bold" />
        <CText size="small" msg="Software developer" />
        <CText onClick={ handleHomeClick } size="small" msg="HOME" style={ { 
            marginTop: 32,
            letterSpacing: 10 } }/>
        <CText onClick={ handleAboutClick } size="small" msg="ABOUT" style={ { 
            marginTop: 12,
            letterSpacing: 10 } }/>
        <CText onClick={ handleWorkClick } size="small" msg="WORKS" style={ { 
            marginTop: 12,
            letterSpacing: 10 } }/>
        <CText onClick={ handleContactClick } size="small" msg="CONTACT" style={ { 
            marginTop: 12,
            letterSpacing: 6 } }/>
        <CText size="small" msg="Theme" style={ { 
            letterSpacing: 4,
            marginTop: 32 } }/>
        <ColorThemeSelector />
        <div style={ { 
            flex: 1,
            ...getFlexStyle('center', 12),
            alignItems: 'flex-end',
        } }>
            <AiFillGithub onClick={ () => window.open('https://github.com/Jo-chana')}
                size={ iconSize } color={ fontColor.bright }/>
            <AiFillLinkedin onClick={ () => window.open('https://www.linkedin.com/in/chana-good/')}
                size={ iconSize } color={ fontColor.bright } />
            <AiFillInstagram onClick={ () => window.open('https://www.instagram.com/jochxna/')}
                size={ iconSize } color={ fontColor.bright } />
            <AiOutlineGlobal onClick={ () => window.open('https://chana.tistory.com')}
                size={ iconSize } color={ fontColor.bright } />
        </div>
        <CText style={ { marginTop: 8 } } size="extraSmall" msg="© 2021. Jo Chana. All rights reserved." />
    </div>
}

export function SidebarContainer() {

    const open = useSelector(selectSidebar);
    const handleSetOpen = useCallback(() => {
        dispatch(sidebarClick());
    }, [])

    const isDesktop = useIsDesktop();

    return <Sidebar 
        docked={ isDesktop }
        onSetOpen={ handleSetOpen } 
        styles={ SIDEBAR_STYLE } sidebar={ <SidebarComponent /> } open={ open } 
        children={ <></> }/>
}

