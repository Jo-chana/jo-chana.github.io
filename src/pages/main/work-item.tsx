import React, { CSSProperties } from 'react';
import ReactPlayer from 'react-player/youtube';

import { CText } from '../../components/text';
import AvocadoGraph from '../../images/avocado-graph.png';
import AvocadoGraph2 from '../../images/avocado-graph2.png';
import Chika from '../../images/chika.png';
import Chika2 from '../../images/chika2.png';
import Popol3d from '../../images/popol3d.png';
import { useIsMobile } from '../../lib/hooks';
import { getScreenHeight, getScreenWidth } from '../../lib/style';
import { WORKS_SCROLL_HEIGHT } from './works';

const avocadoPostUrl = "https://chana.tistory.com/entry/Colab-Keras-Avocado-Price-%EC%98%88%EC%B8%A1-%EB%AA%A8%EB%8D%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-2?category=858961";
const chikaPostUrl = "https://chana.tistory.com/entry/DlibCloud-RunAndroid-%EC%B9%98%EC%95%84-%EC%83%81%ED%83%9C-%EC%A0%90%EA%B2%80-AI-%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%B0%B0%ED%8F%AC-%EA%B8%B0%EB%A1%9D%EC%9A%A9?category=893278";
const footPrintUrl = "https://www.youtube.com/watch?v=m-h2F6aQGJ4";
const hankkiUrl = "https://youtu.be/T-P_hIjU6Nk";
const linderUrl = "https://youtu.be/kydYotiUJZ8";
const buvUrl = "https://youtu.be/MrGD0cg3SdI";
const WORK_ITEM_GAP = 60;
const WORK_ITEM_NUM = 3;
const GLASS_STYLE: CSSProperties = {
    background: 'rgba( 255, 255, 255, 0.35 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    borderRadius: 10,
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    backdropFilter: 'blur( 5.5px )',
    WebkitBackdropFilter: 'blur(5.5px)'
}

function WorkItem({
    progress,
    index,
    children,
}: {
    progress: number;
    index: number;
    children?: React.ReactChild;
}) {
    const isMobile = useIsMobile();
    const itemWidth = isMobile ? getScreenWidth() * 2 / 3 : 400;
    const itemHeight = isMobile ? getScreenHeight() * 2 / 3 : 600;

    return <div style={ { 
        width: itemWidth, 
        height: itemHeight,
        position: 'absolute',
        padding: 12,
        top: '24vh',
        boxSizing: 'border-box',
        right: -itemWidth * index - WORK_ITEM_GAP * index,
        transform: `translate3d(${-WORKS_SCROLL_HEIGHT *
                    progress * 1.5 + itemWidth * 
                    WORK_ITEM_NUM + WORK_ITEM_GAP * (WORK_ITEM_NUM - 1)}px, 0, 0)`,
        ...GLASS_STYLE,
    } } >
        { children }
    </div>
}

export function AvocadoItem({
    progress,
    index,
}: {
    progress: number;
    index: number;
}) {

    return <WorkItem progress={ progress } index={ index }>
        <div onClick={ () => window.open(avocadoPostUrl)}>
            <img src={ AvocadoGraph } style={ { 
                width: '100%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
            } }/>
            <img src={ AvocadoGraph2 } style={ { 
                width: '100%',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            } }/>
            <CText dark msg="Avocado price" style={ { 
                marginTop: 12,
                fontWeight: 'bold',
            } }/>
            <CText size="small" dark msg={'Predict avocado price using keras'} 
                style={ { 
                    marginTop: 24,
                }}/>
            <div style={ { 
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                marginTop: 12,
            } }>
                <CText size="small" dark msg=" - Data visuallization" />
                <CText size="small" dark msg=" - Machine learning" />
            </div>
            <CText size="small" dark msg="VISIT BLOG" 
                style={ { 
                    position: 'absolute',
                    bottom: 18,
                    letterSpacing: 5,
                } }/>
        </div>
    </WorkItem>
}

export function Popol3dItem({
    progress,
    index,
}: {
    progress: number;
    index: number;
}) {

    return <WorkItem progress={ progress } index={ index }>
        <div >
            <img src={ Popol3d } style={ { 
                width: '100%',
                borderRadius: 10,
            } } />
            <CText dark msg="Statue" style={ { 
                marginTop: 12,
                fontWeight: 'bold',
            } }/>
            <CText size="small" dark msg={'Practice three.js'} 
                style={ { 
                    marginTop: 24,
                }}/>
            <div style={ { 
                position: 'absolute',
                bottom: 18,
            } }>
                <CText onClick={ () => window.open('https://github.com/Jo-chana/portfolio') } 
                    size="small" dark msg="GITHUB" 
                    style={ { 
                        letterSpacing: 5,
                        marginBottom: 10,
                    } }/>
                <CText onClick={ () => window.open('https://portfolio.chana.world') } 
                    size="small" dark msg="WEBSITE" 
                    style={ { 
                        letterSpacing: 5,
                    } }/>
            </div>
        </div>
    </WorkItem>
}

export function FootPrintItem({
    progress,
    index,
}: {
    progress: number;
    index: number;
}) {
    const isMobile = useIsMobile();
    const size = (isMobile ? getScreenWidth() * 2 / 3 : 400) - 24;

    return <WorkItem progress={progress} index={index}>
        <div onClick={ () => window.open('https://github.com/Jo-chana/footprint-v2')}>
            <ReactPlayer width={ size } height={ size } url={ footPrintUrl} 
                style={ { borderRadius: 10 } }/>
            <CText style={ { 
                marginTop: 18,
            } } weight="bold" dark msg="Foot Print" />
            <CText style={ { 
                marginTop: 24,
            } } size="small" dark msg="Location-based memory sharing service" />
            <CText style={ { 
                marginTop: 12,
            } } size="small" dark msg="- Android app" />
            <CText size="small" dark msg="GITHUB" 
                style={ { 
                    position: 'absolute',
                    bottom: 18,
                    letterSpacing: 5,
                } }/>
        </div>
    </WorkItem>
}

export function HankkiItem({
    progress,
    index,
}: {
    progress: number;
    index: number;
}) {

    const isMobile = useIsMobile();
    const size = (isMobile ? getScreenWidth() * 2 / 3 : 400) - 24;
    
    return <WorkItem progress={progress} index={index}>
        <div onClick={ () => window.open("https://github.com/Jo-chana/FoodDeal")}>
            <ReactPlayer width={ size } height={ size } url={ hankkiUrl} 
                style={ { borderRadius: 10 } }/>
            <CText style={ { 
                marginTop: 18,
            } } weight="bold" dark msg="Food Deal" />
            <CText style={ { 
                marginTop: 24,
            } } size="small" dark msg="Location-based food sharing service for single-person households." />
            <CText style={ { 
                marginTop: 12,
            } } size="small" dark msg="- Android app" />
            <CText size="small" dark msg="GITHUB" 
                style={ { 
                    position: 'absolute',
                    bottom: 18,
                    letterSpacing: 5,
                } }/>
        </div>
    </WorkItem>
}

export function ChikaItem({
    progress,
    index,
}: {
    progress: number;
    index: number;
}) {

    const isMobile = useIsMobile();
    const size = (isMobile ? getScreenWidth() * 2 / 3 : 400) - 24;

    return <WorkItem progress={progress} index={index}>
        <div >
            <img src={ Chika } style={ { 
                width: '100%',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: size / 2,
            } } />
            <img src={ Chika2 } style={ { 
                width: '100%',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                height: size / 2,
            } } />
            <CText style={ { 
                marginTop: 18,
            } } weight="bold" dark msg="Chika Lab" />
            <CText style={ { 
                marginTop: 24,
            } } size="small" dark msg="(For fun) Website to check your teeth" />
            <CText style={ { 
                marginTop: 12,
            } } size="small" dark msg="- Android app, website" />
            <CText size="small" dark msg="VISIT BLOG" 
                style={ { 
                    position: 'absolute',
                    bottom: 18,
                    letterSpacing: 5,
                } } onClick={ () => window.open(chikaPostUrl) }/>
        </div>
    </WorkItem>
}

export function LinderItem({
    progress,
    index,
}: {
    progress: number;
    index: number;
}) {

    const isMobile = useIsMobile();
    const size = (isMobile ? getScreenWidth() * 2 / 3 : 400) - 24;

    return <WorkItem progress={progress} index={index}>
        <div >
            <ReactPlayer width={ size } height={ size } url={ linderUrl} 
                style={ { borderRadius: 10 } }/>
            <CText style={ { 
                marginTop: 18,
            } } weight="bold" dark msg="Linder" />
            <CText style={ { 
                marginTop: 24,
            } } size="small" dark msg="Social Calendar, Linder." />
            <CText style={ { 
                marginTop: 12,
            } } size="small" dark msg="- Server, iOS/Android app" />
            <div style={ { 
                position: 'absolute',
                bottom: 18,
            } }>
                <CText size="small" dark style={ { 
                    letterSpacing: 5,
                    marginBottom: 10,
                } } msg="WEBSITE" onClick={ () => window.open("https://linder.kr")}/>
                <CText size="small" dark style={ { 
                    letterSpacing: 5,
                } } msg="ABOUT MORE" onClick={ () => window.open('/popol.pdf')}/>
            </div>
        </div>
    </WorkItem>
}

export function BuvItem({
    progress,
    index,
}: {
    progress: number;
    index: number;
}) {

    const isMobile = useIsMobile();
    const size = (isMobile ? getScreenWidth() * 2 / 3 : 400) - 24;

    return <WorkItem progress={progress} index={index}>
        <div >
            <ReactPlayer width={ size } height={ size } url={ buvUrl } 
                style={ { borderRadius: 10 } }/>
            <CText style={ { 
                marginTop: 18,
            } } weight="bold" dark msg="Buv" />
            <CText style={ { 
                marginTop: 24,
            } } size="small" dark msg="Broden Music Lives." />
            <CText style={ { 
                marginTop: 12,
            } } size="small" dark msg="- Server, Admin, website" />
            <div style={ { 
                position: 'absolute',
                bottom: 18,
            } }>
                <CText size="small" dark style={ { 
                    letterSpacing: 5,
                    marginBottom: 10,
                } } msg="WEBSITE" onClick={ () => window.open("https://buv.co.kr")}/>
                <CText size="small" dark style={ { 
                    letterSpacing: 5,
                } } msg="ABOUT MORE" onClick={ () => window.open('/popol.pdf')}/>
            </div>
        </div>
    </WorkItem>
}