import { Main } from '../pages/main';
import { Work } from '../pages/work';

interface IRouteItem {
    name: string;
    exact?: boolean;
    component: any;
    path: string;
}

export const Routes: IRouteItem[] = [
    {
        name: 'main',
        exact: true,
        component: Main,
        path: '/'
    },
    {
        name: 'Work',
        exact: true,
        component: Work,
        path: '/work',
    }
]