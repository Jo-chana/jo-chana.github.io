import React from 'react';
import { withTranslation } from 'react-i18next';
import { Provider } from 'react-redux';

import './lib/i18n';
import RootContainer from './router/root-container';
import { store } from './store';

function App() {

    return <Provider store={ store } > 
        <RootContainer />
    </Provider>;
}

export default withTranslation()(App);
