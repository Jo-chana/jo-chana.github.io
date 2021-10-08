import { CSSProperties } from 'react';
import { useSelector } from 'react-redux';

import { selectColorKey } from '../store/color';
import {
    COLOR_CAFE, COLOR_GALAXY, COLOR_PASTEL_ANGEL, COLOR_PASTEL_BLUE, COLOR_PASTEL_BRIGHT,
    COLOR_PASTEL_RAINBOW, COLOR_PASTEL_ROSEGOLD, COLOR_SET, colorType,
} from './guideline/color';
import { FONT_SIZE, MOBILE_FONT_SIZE, PADDING } from './guideline/layout';
import { useIsMobile } from './hooks';

export function getRoundStyle(size: number) {
    return {
        width: size,
        height: size,
        borderRadius: size,
    }
}

export function paddingVertical(padding: number) {
    return {
        paddingTop: padding,
        paddingBottom: padding,
    }
}
export function paddingHorizontal(padding: number) {
    return {
        paddingLeft: padding,
        paddingRight: padding,
    }
}

let screenWidth: number = 0;

export function getScreenWidth() {
    if(screenWidth === 0)
        screenWidth = window.innerWidth;
    return screenWidth;
}

let screenHeight: number = 0;

export function getScreenHeight() {
    if(screenHeight === 0)
        screenHeight = window.innerHeight;
    return screenHeight;
}

export function useColor() {
    const colorKey = useSelector(selectColorKey);
    const colorSet = COLOR_SET[colorKey as colorType];
    let background1, background2, primary, secondary, point1, point2;
    switch(colorSet) {
        case COLOR_PASTEL_BRIGHT:
            background1 = colorSet.yellow;
            background2 = colorSet.orange;
            primary = colorSet.blue;
            secondary = colorSet.green;
            point1 = colorSet.red;
            point2 = colorSet.purple;
            break;
        case COLOR_PASTEL_RAINBOW:
            background1 = colorSet.yellow;
            background2 = colorSet.orange;
            primary = colorSet.blue;
            secondary = colorSet.green;
            point1 = colorSet.red;
            point2 = colorSet.purple;
            break;
        case COLOR_PASTEL_ROSEGOLD:
            background1 = colorSet.one;
            background2 = colorSet.two;
            primary = colorSet.four;
            secondary = colorSet.three;
            point1 = colorSet.six;
            point2 = colorSet.five;
            break;
        case COLOR_PASTEL_ANGEL:
            background1 = colorSet.white;
            background2 = colorSet.skyBlue;
            primary = colorSet.purple;
            secondary = colorSet.blue;
            point1 = colorSet.pink;
            point2 = colorSet.basie;
            break;
        case COLOR_PASTEL_BLUE:
            background1 = colorSet.one;
            background2 = colorSet.two;
            primary = colorSet.four;
            secondary = colorSet.three;
            point1 = colorSet.six;
            point2 = colorSet.five;
            break;
        case COLOR_CAFE:
            background1 = colorSet.one;
            background2 = colorSet.two;
            primary = colorSet.four;
            secondary = colorSet.three;
            point1 = colorSet.six;
            point2 = colorSet.five;
            break;
        case COLOR_GALAXY:
            background1 = colorSet.one;
            background2 = colorSet.two;
            primary = colorSet.four;
            secondary = colorSet.three;
            point1 = colorSet.six;
            point2 = colorSet.five;
            break;
    }

    return {
        background1, background2, primary, secondary, point1, point2,
    }
}

export function getFlexStyle(
    justifyContent: 'space-between' | 'flex-start' | 'flex-end' | 'center',
    gap?: number) {
    return {
        justifyContent,
        display: 'flex',
        alignItems: 'center',
        gap
    } as CSSProperties;
}

export function useFontSize() {
    const isMobile = useIsMobile();
    return isMobile ? MOBILE_FONT_SIZE : FONT_SIZE;
}

export function useFontColor() {
    const colorKey = useSelector(selectColorKey);
    let bright, dark; // brightness of background
    switch(colorKey) {
        case 'pastel-angel':
            bright = '#2C5D87';
            dark = '#2C5D87';
            break;
        case 'pastel-rosegold':
            bright = '#B76E78';
            dark = '#ffffff';
            break;
        case 'pastel-bright':
            bright = 'black';
            dark = 'black';
            break;
        case 'cafe':
            bright = '#644431';
            dark = '#ffffff';
            break;
        default:
            bright = '#ffffff';
            dark = '#ffffff';
    }
    return {bright, dark};
}

export function useContainerPadding() {
    const isMobile = useIsMobile();
    return isMobile ? PADDING.P5 : PADDING.P2
}

// @adamgiebl/neumorphism
export function colorLuminance(hex: string, lum?: number) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    lum = lum || 0
  
    // convert to decimal and change luminosity
    let rgb = '#',
        c,
        i
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16)
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
        rgb += ('00' + c).substr(c.length)
    }
  
    return rgb
}

export function getContrast(hex: string) {
    const r = parseInt(hex.substr(1, 2), 16),
        g = parseInt(hex.substr(3, 2), 16),
        b = parseInt(hex.substr(5, 2), 16),
        yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? '#001f3f' : '#F6F5F7'
}

export function getNeumorphismStyle(color: string, size: number, type?: number) {
    const distance = Math.round(size * 0.1);
    const shape = type ?? 0;
    let firstLum = 0, secondLum = 0;
    switch(shape) {
        case  0:
            break;
        case 1:
            firstLum = 0.12
            secondLum = -0.1
            break;
        case 2:
            firstLum = -0.1
            secondLum = 0.12
            break;
        case 3:
            break;
    }
    const firstGradientColor = colorLuminance(color, firstLum)
    const secondGradientColor = colorLuminance(color, secondLum)
    const background = (shape == 0 || shape == 3) ?
        color : `linear-gradient(145deg, ${firstGradientColor}, ${secondGradientColor})`;
    const darkColor = colorLuminance(color, 0.1 * -1)
    const lightColor = colorLuminance(color, 0.1)
    const firstBoxShadow = `${shape == 3 ? 'inset': ''} ${distance}px ${distance}px 24px ${darkColor}`
    const secondBoxShadow = `${shape == 3 ? 'inset': ''} ${distance * -1}px ${distance * -1}px 48px ${lightColor}`
    const boxShadow = `${firstBoxShadow}, ${secondBoxShadow}`

    return {
        boxShadow,
        background,
    }
}

export function getNeumorphismTextStyle(color: string, size: number) {
    const distance = Math.round(size * 0.1);
    
    const darkColor = colorLuminance(color, 0.1 * -1)
    const lightColor = colorLuminance(color, 0.1)
    const firstBoxShadow = `${distance}px ${distance}px 24px ${darkColor}`
    const secondBoxShadow = `${distance * -1}px ${distance * -1}px 48px ${lightColor}`
    const textShadow = `${firstBoxShadow}, ${secondBoxShadow}`

    return {
        textShadow
    }
}