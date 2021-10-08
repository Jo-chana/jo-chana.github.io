import React, { CSSProperties } from 'react';

import { fontSizeType } from '../lib/guideline/layout';
import { useFontColor, useFontSize } from '../lib/style';

export function CText({
    msg,
    size = 'medium',
    weight = 'normal',
    style,
    dark = false,
    lineGap = 0,
    align = 'start',
    cls = '',
    onClick,
}: {
    msg: string;
    size?: fontSizeType;
    weight?: 'bold' | 'bolder' | 'lighter' | 'normal'
    style?: CSSProperties;
    dark?: boolean;
    lineGap?: number;
    align?: 'start' | 'end' | 'center';
    cls?: string;
    onClick?: () => void;
}) {

    const fontColor = useFontColor();
    const fontSize = useFontSize();
    const msgList = msg?.split('\n') || [];

    const textStyle: CSSProperties = {
        fontFamily: 'Gmarket sans',
        color: dark ? fontColor.dark : fontColor.bright,
        fontSize: fontSize[size],
        fontWeight: weight,
        ...style,
    };

    return <div onClick={ onClick } className={ cls } style={ textStyle}>
        { msgList.map((it, idx) =>
            <p key={ idx } style={ { 
                width: '100%',
                textAlign: align,
                marginTop: idx !== 0 ? lineGap : 0
            } }>
                { it }
                { idx !== msgList.length - 1 && <br/>}
            </p>        
        )}
    </div>;
}