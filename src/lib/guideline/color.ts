export const COLOR_PASTEL_BRIGHT = {
    blue: '#31BFF3',
    purple: '#A484E9',
    red: '#F4889A',
    orange: '#FFAF68',
    yellow: '#F6E683',
    green: '#79D45E',
}

export const COLOR_PASTEL_ANGEL = {
    white: '#FAFFFD',
    skyBlue: '#E6FEFF',
    blue: '#D9F6FF',
    purple: '#D9D0FF',
    pink: '#F8DAEE',
    basie: '#FEE7EB',
}

export const COLOR_PASTEL_BROWN = {
    light1: '#EAE1D8',
    light2: '#EBD4BE',
    neutral1: '#D3CCC4',
    neutral2: '#D9C4B2',
    dark1: '#BCBFC0',
    dark2: '#ADADAF',
}

export const COLOR_PASTEL_BLUE = {
    // light ~ dark
    one: '#BBD3FB',
    two: '#9FBFF5',
    three: '#81A9EE',
    four: '#6A96E1',
    five: '#5985D0',
    six: '#3B69B7',
}

export const COLOR_PASTEL_ROSEGOLD = {
    // light ~ dark
    one: '#FFE3DE',
    two: '#F1CCCA',
    three: '#E2B4B5',
    four: '#D49DA1',
    five: '#C5858C',
    six: '#B76E78',
}

export const COLOR_PASTEL_RAINBOW = {
    blue: '#2AA8F2',
    green: '#8BD448',
    yellow: '#FAE442',
    orange: '#FBA949',
    red: '#FF6355',
    purple: '#9C4F96',
}

export const COLOR_CAFE = {
    // light ~ dark
    one: '#FEFFE7',
    two: '#FED2A1',
    three: '#A97953',
    four: '#644431',
    five: '#47362C',
    six: '#32281F',
}

export const COLOR_GALAXY = {
    // light ~ dark
    one: '#7A00B2',
    two: '#5E00A0',
    three: '#42008D',
    four: '#26007B',
    five: '#0A0068',
    six: '#000000',
}

export const COLOR_SET = {
    'pastel-bright': COLOR_PASTEL_BRIGHT,
    'pastel-rainbow': COLOR_PASTEL_RAINBOW,
    'pastel-rosegold': COLOR_PASTEL_ROSEGOLD,
    'pastel-angel': COLOR_PASTEL_ANGEL,
    'pastel-blue': COLOR_PASTEL_BLUE,
    'cafe': COLOR_CAFE,
    'galaxy': COLOR_GALAXY,
};

export type colorType = keyof typeof COLOR_SET

