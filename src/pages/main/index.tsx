import React from 'react';
import { Controller } from 'react-scrollmagic';

import { About } from './about';
import { Contact } from './contact';
import { Home } from './home';
import { Works } from './works';

export function Main() {
    return <Controller>
        <Home />
        <About />
        <Works />
        <Contact />
    </Controller>;
}