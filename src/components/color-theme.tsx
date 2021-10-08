import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { COLOR_SET, colorType } from '../lib/guideline/color';
import { getFlexStyle } from '../lib/style';
import { dispatch } from '../store';
import { selectColorKey, setColorKey } from '../store/color';

export function ColorThemeSelector() {

    const colorKey = useSelector(selectColorKey);
    const [open, setOpen] = useState(false);

    const handleThemeClick = useCallback((key: string) => {
        dispatch(setColorKey(key as colorType));
        setOpen(false);
    }, []);

    return <div onClick={ () => setOpen(!open) }
        style={ { 
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.2)',
            position: 'relative',
            height: 30,
            width: 80,
            ...getFlexStyle('center'),
        } }>
        { Object.values(COLOR_SET[colorKey]).map(color => 
            <div key={ color } style={ { 
                flex: 1,
                height: '100%',
                backgroundColor: color,
            } } />
        )}
        { open && 
            <div style={ { 
                position: 'absolute',
                top: 38,
                width: 120,
                right: 0,
            } }>
                { Object.keys(COLOR_SET).map(key => 
                    <div key={ key } onClick={ () => handleThemeClick(key) }
                        style={ {
                            ...getFlexStyle('flex-start'),
                            height: 32,
                        } }>
                        { Object.values(COLOR_SET[key as colorType]).map(color => 
                            <div key={ `${key}:${color}` } 
                                style={ { 
                                    backgroundColor: color,
                                    flex: 1,
                                    height: '100%',
                                } } />    
                        )}
                    </div>    
                )}
            </div>
        }
    </div>
}