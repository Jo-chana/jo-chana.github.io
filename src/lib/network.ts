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