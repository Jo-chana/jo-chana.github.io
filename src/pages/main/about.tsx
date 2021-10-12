import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Scene } from 'react-scrollmagic';

import { CText } from '../../components/text';
import ImCoding from '../../images/imcoding.jpg';
import Kma from '../../images/kma.jpg';
import Lab from '../../images/laboratory.jpg';
import Linder from '../../images/linder.png';
import Monitors from '../../images/monitors.png';
import Profile from '../../images/profile.png';
import { HEADER_HEIGHT } from '../../lib/guideline/layout';
import { useIsMobile } from '../../lib/hooks';
import {
    getFlexStyle, getRoundStyle, getScreenHeight, getScreenWidth, paddingHorizontal, useColor,
    useContainerPadding,
} from '../../lib/style';
import { dispatch } from '../../store';
import { selectPage, setPage } from '../../store/page';

export const ABOUT_SCROLL_HEIGHT = getScreenHeight() * 3;

const years = [
    '2019.5', '2020.1', '2020.5', '2020.10', '2021.3', 'NOW'
]
const messages = [
    'I dropped out of the KMA\n(Korea Military Academy)\nto become a developer.', 
    'Then, all I did was\nto stay up all night\nstudying or coding.',
    'Even when my friend\ncame to my house,\nI CODED.\n\n(I treated him later)',
    'Fortunately,\nI also worked\nwith support from\na national research institute.',
    'And then,\nI joined the team\nHIDDENTRACK,\ndeveloped a service\ncalled "Linder".',
    'I have constantly\ntried to grow\nas a great developer\nfor 2 years,\nand I am still doing so.'
]
const images = [Kma, Monitors, ImCoding, Lab, Linder, Profile];

function getAboutMeText(progress: number) {
    if(progress >= 0.75) return messages[messages.length - 1];
    const offset = 0.75/messages.length;
    return messages[Math.floor(progress / offset)];
}
function getYear(progress: number) {
    if(progress >= 0.75) return years[years.length - 1];
    const offset = 0.75/years.length;
    return years[Math.floor(progress / offset)];
}
function getImageIndex(progress: number) {
    if(progress < 0) return 0;
    if(progress >= 0.75) return images.length - 1;
    const offset = 0.75/images.length;
    return Math.floor(progress / offset);
}

function BackgroundImage({
    src,
    opacity,
    visible,
}: {
    src: string;
    opacity?: string | number;
    visible?: boolean;
}) {

    const isMobile  = useIsMobile();

    return <img style={ { 
        position: 'absolute',
        objectFit: 'cover',
        top: 0,
        right: 0,
        opacity,
        width: isMobile ? '100vw' : '50vw',
        height: '100vh',
        display: visible ? undefined : 'none'
    } } src={ src } />
}

export function About() {

    const containerPadding = useContainerPadding();
    const isMobile = useIsMobile();
    const color = useColor();
    const [animate, setAnimate] = useState('');
    const handleScroll = useCallback((progress: number) => {
        if(progress < 1) {
            if(animate !== 'fadeOut animated') return;
            setAnimate('fadeIn animated');
        } else {
            if(animate !== 'fadeOut animated') setAnimate('fadeOut animated');
            return;
        }
    }, [animate]);
    const page = useSelector(selectPage);

    const handleProgress = useCallback((progress: number) => {
        if(progress > 0 && progress < 1) {
            if(page !== 'about') {
                dispatch(setPage('about'))
            }
        }
    }, [page])

    return <Scene duration={ ABOUT_SCROLL_HEIGHT } pin triggerHook={ 0 }>
        { (progress: number) => {
            handleScroll(progress);
            handleProgress(progress);
            const imageOpacity = `${(isMobile ? 0.3 : 0.7) * (Math.min(progress * 3, 0.5) * 2)}`;
            const imageIndex = getImageIndex(progress - 0.25);

            return <div className={ `about ${animate}`} style={ { height: '100vh',
                backgroundColor: color.background2,
                position: 'relative',
                overflow: 'hidden',
                paddingTop: HEADER_HEIGHT,
                ...paddingHorizontal(containerPadding) } } >
                
                { images.map((image, idx) => 
                    <BackgroundImage visible={ idx === imageIndex } key={ idx } src={ image } opacity={ imageOpacity } />
                )}
                <CText size="g1" msg="About Me" 
                    style={ { 
                        position: isMobile ? 'relative' : 'absolute',
                        top: isMobile ? 20 : 140,
                        left: isMobile ? undefined : '5vw',
                        letterSpacing: isMobile ? 0 : 30,
                        transform: `translate3d(-${
                            ABOUT_SCROLL_HEIGHT * (0.5 - Math.min(progress * 2, 0.5))
                        }px, 0, 0)`
                    } }
                />
                <div style={{ 
                    position: 'absolute',
                    width: '100vw',
                    height: 2,
                    bottom: 128,
                    left: 0,
                }} >
                    <div style={ { 
                        ...getRoundStyle((isMobile ? 24 : 48)),
                        ...getFlexStyle('center'),
                        position: 'relative',
                        top: 2, 
                        backgroundColor: color.point1,
                        transform: `translate3d(${(progress - 0.25) / 0.75 * getScreenWidth()}px, 0, 0)`,
                    } } >
                        <div style={ { ...getRoundStyle((isMobile ? 20 : 40)),
                            transform: `rotate(${progress * 5 * 360}deg)`,
                            backgroundColor: color.background1,
                            ...getFlexStyle('center')
                        } } >
                            <CText msg=":)" />
                        </div>
                    </div>
                </div>
                <CText size="large" msg={ getYear(progress - 0.25)} 
                    style={ { 
                        position: 'absolute',
                        top: '40vh',
                        height: 40,
                        right: isMobile ? '10vw' : '55vw',
                        letterSpacing: 10,
                    } }
                />
                <CText size="medium" msg={ getAboutMeText(progress - 0.25) } 
                    align="end"
                    lineGap={ 10 }
                    style={ { 
                        position: 'absolute',
                        top: '50vh',
                        height: 40,
                        right: isMobile ? '10vw' : '55vw',
                        letterSpacing: 3,
                    } }
                />
            </div> }
        }
    </Scene>
}