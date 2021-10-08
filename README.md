# chana-react-boilerplate

### I made it to make the high-quality websites easier, faster, and efficiently.

***

## **what's in?**
### This project is based on create-react-app --template typescript boilerplate,
### and I Added **some libraries** which seems to be useful for making modern website.
+ **react-router-dom**
+ **react-redux, redux/tookit**
+ **react-sidebar**
+ **react-i18next**

***
## **Several settings are prepared in advance in this boilerplate.**
### 1. **Router**
> You can add pages simply by adding route item like below.
```typescript
// src/router/routes.ts
import { Home } from '../pages/home';

interface IRouteItem {
    name: string;
    exact?: boolean;
    component: any;
    path: string;
}

export const Routes: IRouteItem[] = [
    {
        name: 'home',
        exact: true,
        component: Home,
        path: '/'
    }
]
```
```jsx
// src/router/root-container.tsx
export default function RootContainer() {

    return <BrowserRouter>
        {
            Routes.map(it => 
                <Route 
                    key={ it.name } 
                    exact={ it.exact ?? false } 
                    path={ it.path } 
                    component={ it.component } />
            )
        }
    </BrowserRouter>
}
```
### 2. **Multilingual**
> Add language options to resource variable, like below. 
>> language option formatted by <key: { language file (json) }>
```javascript
const resource =  {
    en: {
        // import translationEn from './en.json'
        translation: translationEn
    },
    ko: {
        // import translationKo from './ko.json'
        translation: translationKo
    }
};

export type langType = keyof typeof resource;

i18n
    .use(initReactI18next)
    .init({
        resources: resource,
        lng: "ko",
        fallbackLng: 'ko',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
```
```javascript
// src/App.tsx
export default withTranslation()(App);
```
### 3. **State management (redux)**
> The store for the sidebar state is basically registered. you can delete it if you don't use sidebar component
```javascript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';

import sidebarReducer from './sidebar';

export const store = configureStore({
    reducer: {
        // Add your reducers
        sidebar: sidebarReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export const dispatch = store.dispatch;
  
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```
```javascript
// src/store/sidebar.ts
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './';

// It's sidebar reducer, use it if you need sidebar component.
export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: false,
    reducers: {
        sidebarClick: state => !state,
        sidebarOpen: () => true,
        sidebarClose: () => false,
    }
})

export const { sidebarClick, sidebarOpen, sidebarClose } = sidebarSlice.actions;
export const selectSidebar = (state: RootState) => state.sidebar;
export default sidebarSlice.reducer;
```
```jsx
// src/App.tsx
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return <Provider store={ store } >            
        <RootContainer />
    </Provider>;
}
```
***
## **And various util functions are also included.**
> useBackgroundEffect for asynchronous tasks, for example:
```javascript
export type TAsyncFunction<T> = () => Promise<T>;

export function useBackgroundEffect(asyncFn: TAsyncFunction<void>, deps: DependencyList) {
    useEffect(() => {
        async function promise() {
            asyncFn();
        }
        promise();
    }, deps);
}
```
> If you want to make a reponsive web,
```javascript
export function useIsMobile() {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)"});
    return isMobile;
}
```
> Basic request function
```javascript
import { sleepAsync } from './util';

const RETRY_SLEEP_TIMES = [100, 500, 1000, 2000, 3000];

export async function requestAsync({
    method = 'GET',
    url,
    body,
}: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    body?: Object;
}) {
    const endpoint = `${url}`
    const options: any = {
        method,
    }
    if(body)
        options.body = JSON.stringify(body)
    
    for(const time of RETRY_SLEEP_TIMES) {
        try {
            const result = await fetch(endpoint, options);
            return result.json()
    
        } catch(error) {
            console.error(error);
            await sleepAsync(time);
        }
    }

    return null;
}
```
> If want to link your website to google analytics
```typescript
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
```