import * as H from 'history';
import ReactGA from 'react-ga';

// Set tracking id of your project for google analytics
const TRACKING_ID = '';

export const initializeGA = () => {
    ReactGA.initialize(TRACKING_ID, { debug: false });
};

export const logPageView = (history: H.History) => {
    const page = history.location.pathname || window.location.pathname;
    ReactGA.set({ page: page });
    ReactGA.pageview(page);
};