import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { HEADER_HEIGHT } from '../lib/guideline/layout';
import { useIsDesktop, useIsMobile } from '../lib/hooks';
import {
    getFlexStyle, paddingHorizontal, useContainerPadding,
} from '../lib/style';
import { selectPage } from '../store/page';
import { SidebarButton } from './sidebar';
import { CText } from './text';

export default function Header() {

    const padding = useContainerPadding();
    const page = useSelector(selectPage);
    const dark = page === 'works';
    const isMobile = useIsMobile();
    const isDesktop = useIsDesktop();
    const history = useHistory();

    const handleHomeClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const handleResumeClick = useCallback(() => {
        history.push('/resume');
    }, [history]);

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
                    <div onClick={ handleResumeClick }>
                        <CText dark={ dark } size="small" msg="RESUME" />
                    </div>
                </div>
            </>
            }
        </div>
    </div>;
}