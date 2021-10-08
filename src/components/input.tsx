import React, { CSSProperties, useCallback, useState } from 'react';

import { fontSizeType } from '../lib/guideline/layout';
import {
    paddingHorizontal, paddingVertical, useColor, useFontColor, useFontSize,
} from '../lib/style';

export function CInput({
    onChange,
    size = 'medium',
    multiline = false,
    placeholder = '',
    style,
    dark = true,
    fontColor,
}: {
    onChange?: (t: string) => void;
    size?: fontSizeType;
    multiline?: boolean;
    placeholder?: string;
    style?: CSSProperties;
    dark?: boolean;
    fontColor?: string;
}) {

    const fColor = useFontColor();
    const bColor = useColor();
    const color = dark ? fColor.dark : fColor.bright;
    const fontSize = useFontSize();
    const [focused, setFocused] = useState(false);

    const handleMultilineChange:React.ChangeEventHandler<HTMLTextAreaElement>
    = useCallback((e) => {
        if(onChange)
            onChange(e.target.value);
    }, [onChange]);

    const handleChange:React.ChangeEventHandler<HTMLInputElement>
        = useCallback((e) => {
            if(onChange)
                onChange(e.target.value);
        }, [onChange]);

    const inputStyle = { 
        backgroundColor: color,
        border: `solid ${color}`,
        width: '100%',
        color: fontColor ?? bColor.point1,
        fontSize: fontSize[size],
        '--placeholder-color': fontColor ?? bColor.point1,
        boxSizing: 'border-box',
        ...paddingHorizontal(12),
        ...paddingVertical(8),
        borderRadius: 4,
        ...style,
    }

    if(multiline)
        return <textarea spellCheck={false} 
            onFocus={ () => setFocused(true)  } 
            onBlur={() => setFocused(false) } 
            placeholder={ focused ? '' : placeholder } 
            style={ {
                ...inputStyle,
                fontFamily: 'Gmarket sans',
                resize: 'none',
                height: fontSize[size] * 10,
            } as CSSProperties } onChange={ handleMultilineChange } />

    return <input 
        onFocus={ () => setFocused(true)  } 
        onBlur={() => setFocused(false) } 
        placeholder={ focused ? '' : placeholder } 
        spellCheck={false} 
        style={ inputStyle as CSSProperties}
        onChange={ handleChange }/>
}