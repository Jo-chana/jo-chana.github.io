import { isFunction, map } from 'lodash';

export function sleepAsync(time: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

export type TBackgroundTask = Promise<any> | (() => Promise<any>);
export function background(...tasks: TBackgroundTask[]) {
    const promises = map(tasks, task => isFunction(task) ? task() : task);
    /**
     * @TODO Capture Exception
     */
    Promise.all(promises).catch();
}

export function insert<T>(arr: T[], index: number, part: T[]): T[] {
    return arr.slice(0, index)
        .concat(part)
        .concat(arr.slice(index));
}