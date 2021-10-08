import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Scene } from 'react-scrollmagic';

import { CText } from '../../components/text';
import { getScreenWidth, useColor, useContainerPadding } from '../../lib/style';
import { dispatch } from '../../store';
import { selectPage, setPage } from '../../store/page';
import {
    AvocadoItem, BuvItem, ChikaItem, FootPrintItem, HankkiItem, LinderItem, Popol3dItem,
} from './work-item';

export const WORKS_SCROLL_HEIGHT = Math.min(getScreenWidth() * 2 / 3, 400) * 7 * 1.5 + 60 * 6;

export function Works() {

    const color = useColor();
    const padding = useContainerPadding();
    const page = useSelector(selectPage);

    const handleProgress = useCallback((progress: number) => {
        if(progress > 0 && progress < 1) {
            if(page !== 'works') {
                dispatch(setPage('works'))
            }
        }
    }, [page])
    
    return <Scene duration={ WORKS_SCROLL_HEIGHT } pin triggerHook={ 0 } >
        { (progress: number) => {
            handleProgress(progress);
            return <div style={{
                height: WORKS_SCROLL_HEIGHT, 
                backgroundColor: color.primary,
                width: '100%', 
                opacity: 1 - Math.max(progress - 0.8, 0) / 0.2,
                position: 'relative', 
                overflow: 'hidden'}}>
                <CText dark size="g2" weight="bold" msg={`MY WORKS`} style={ { 
                    position: 'absolute',
                    top: '20vh',
                    left: padding,
                    transform: `translate3d(-${WORKS_SCROLL_HEIGHT *
                        (0.5 - (Math.min(progress / 0.2, 0.5)))}px, 0, 0)`,
                    letterSpacing: 20,
                } }/>
                <AvocadoItem progress={ progress } index={ 0 } />
                <ChikaItem progress={ progress } index={ 1 } />
                <Popol3dItem progress={ progress } index={ 2 } />
                <FootPrintItem progress={ progress } index={ 3 } />
                <HankkiItem progress={ progress } index={ 4 } />
                <LinderItem progress={ progress } index={ 5 } />
                <BuvItem progress={ progress } index={ 6 } />
            </div>
        }}
    </Scene>
}