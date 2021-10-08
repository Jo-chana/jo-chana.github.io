import React from 'react';

import { CText } from '../../components/text';
import { useIsMobile } from '../../lib/hooks';
import { useColor } from '../../lib/style';
import { HOME_SCROLL_HEIGHT } from './home';

export function Background({
    progress,
}: {
    progress: number;
}) {

    const color = useColor();
    const zIndex = 0;
    const position = 'absolute';
    const isMobile = useIsMobile();

    return <>
        <div style={ { 
            backgroundColor: color.background2,
            position,
            top: 0,
            right: 0,
            width: '50vw',
            height: '100vh',
            zIndex,
            transform: `translate3d(${HOME_SCROLL_HEIGHT * progress * 1.5}px, 0, 0)`
        } } />
        <CText size="bg" weight="bolder" msg="Software" style={ { 
            fontFamily: 'Hendrickson',
            color: color.secondary,
            position,
            right: 0,
            top: '50vh',
            zIndex,
            letterSpacing: isMobile ? 20 : 50,
            transform: `translate3d(${HOME_SCROLL_HEIGHT * progress}px, 0, 0)`
        } } />
        <CText size="bg" msg="DEVELOPER" style={ { 
            fontFamily: 'Hendrickson',
            color: color.primary,
            position,
            right: 0,
            top: '65vh',
            zIndex,
            letterSpacing: isMobile ? 0 : 10,
            transform: `translate3d(${HOME_SCROLL_HEIGHT * progress * 2.5}px, 0, 0)`
        } } />
        <CText size="g1" msg="portfolio" style={ { 
            fontFamily: 'paint',
            color: color.point2,
            position,
            right: 0,
            zIndex,
            letterSpacing: 50,
            transform: `rotate(90deg) translate3d(${HOME_SCROLL_HEIGHT * progress * 1.5}px, 0, 0)`,
        } } />
    </>
}