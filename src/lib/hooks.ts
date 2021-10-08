import { DependencyList, useEffect, useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useWindowPosition() {
    const [scrollPosition, setPosition] = useState(0);
    useLayoutEffect(() => {
        function updatePosition() {
            setPosition(window.pageYOffset);
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
    }, []);
    return scrollPosition;
}

export type TAsyncFunction<T> = () => Promise<T>;

export function useBackgroundEffect(asyncFn: TAsyncFunction<void>, deps: DependencyList) {
    useEffect(() => {
        async function promise() {
            asyncFn();
        }
        promise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

export function useIsMobile() {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)"});
    return isMobile;
}