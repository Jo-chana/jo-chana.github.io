import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Scene } from 'react-scrollmagic';

import { CText } from '../../components/text';
import { HEADER_HEIGHT } from '../../lib/guideline/layout';
import { useIsMobile } from '../../lib/hooks';
import {
    getFlexStyle, getScreenHeight, paddingHorizontal, useColor, useContainerPadding,
} from '../../lib/style';
import { dispatch } from '../../store';
import { selectPage, setPage } from '../../store/page';
import { Background } from './home-background';

export const HOME_SCROLL_HEIGHT = getScreenHeight();

export function Home() {

    const isMobile = useIsMobile();
    const containerPadding = useContainerPadding();
    const color = useColor();
    const page = useSelector(selectPage);

    const handleProgress = useCallback((progress: number) => {
        if(progress > 0 && progress < 1) {
            if(page !== 'home') {
                dispatch(setPage('home'))
            }
        }
    }, [page])
    
    return <Scene duration={ HOME_SCROLL_HEIGHT }
        pin triggerHook={ 0 }>
        { (progress: number) => {
            handleProgress(progress);
            return <div style={ { height: '100vh', 
                paddingTop: HEADER_HEIGHT,
                backgroundColor: color.background1,
                opacity: 1 - (Math.max(progress - 0.5, 0)) * 2,
                position: 'relative', 
                overflow: 'hidden' } }>
                <div style={ { 
                    paddingTop: 120,
                    ...paddingHorizontal(containerPadding),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    position: 'relative',
                    zIndex: 1,
                    opacity: `${1 - progress * 2}`,
                } }>
                    <CText style={ { 
                        transform: `translate3d(-${HOME_SCROLL_HEIGHT *
                        progress * 0.5}px, 0, 0)`
                    } } size="g1" msg="Hi !" />
                    <div style={ {
                        ...(isMobile ? {} : getFlexStyle('flex-start', 20)),
                        transform: `translate3d(-${HOME_SCROLL_HEIGHT *
                        progress * 0.5}px, 0, 0)`
                    } }>
                        <CText size="g1" msg="My name is" />
                        <CText size="g2" weight="bolder" msg="Chana" />
                    </div>
                </div>
                <Background progress={ progress }/>
            </div>
        }}
    </Scene>
}