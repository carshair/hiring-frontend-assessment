type IApiObj = {
    path: string;
    url?: string;
    type?: 'GET' | 'POST';
    params?: Record<string, string | number>
    data?: Record<string, string | number | boolean>;
    filter?: (params: Record<string, any>) => Record<string, any>;
}

const URL = 'https://myfakeapi.com/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzIiwicGFzc3dvcmQiOiIxMjMiLCJ3ZWJzaXRlIjoid3d3Lm15ZmFrZWFwaS5jb20iLCJpYXQiOjE1NzM1NDMzNjcsImV4cCI6MTU3MzU0NTE2N30.95fFJcUIOsTVLrTNxSVdk4loPQnwWx9tBGJIb19o65';

const buildUrlParams = (url: string, params: Required<IApiObj>['params']): string => {
    if (Object.keys(params).length == 0) return url;
    return url + Object.keys(params).reduce((prev, curr) => {
        return `${prev}&${curr}=${params[curr]}`;
    }, '?');
}

export const Request = async (apiObj: IApiObj) => {
    try {
        const { type, path, url, data, params, filter } = apiObj;
        const options = type === 'POST' ? {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : "{}"
        } : undefined;

        const domain = url ? url : URL;

        const finalUrl = buildUrlParams(domain + path, {
                ...(params || '')
            });

        const response = await fetch(finalUrl, options);
        return await response.json().then(filter ? filter : obj => obj);
    } catch(e) {
        console.error(e);
    }
}

const GET_CARS: IApiObj = {
    path: '/cars',
    filter: (data) => data.cars
}
const GET_CARS_DETAIL: IApiObj = {
    path: '/cars/{ID}',
}

function updateData (index: number, url: string) {
    if (!CACHE_DATA.length || index >= CACHE_DATA.length) return;
    CACHE_DATA[index].url = url;
}

export let CACHE_DATA: any[] = [];
export let CACHE_URLS: string[] = [];

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export const Request_PICS = async (index: number) => {
    try {
        const response = await fetch(`https://picsum.photos/seed/${index}/300.webp`);
        CACHE_URLS.push(response.url);
    } catch(e) {
        console.error(e);
    }
}

export const getListData = (start = 0, end = 50) => {
    console.log(start, end);
    if (CACHE_DATA.length) {
        for (let i = start; i < end; i++) {
            updateData(i, CACHE_URLS[getRandomInt(0, CACHE_URLS.length)]);
        }
        return Promise.resolve(CACHE_DATA.slice(start, end));
    }
    const pics = Array(50).fill(0).map((_, i) => Request_PICS(i))
    return Promise.all([Request(GET_CARS), ...pics]).then(([cars, ...e]) => {
        CACHE_DATA = cars;
        for (let i = start; i < end; i++) {
            updateData(i, CACHE_URLS[getRandomInt(0, CACHE_URLS.length)]);
        }
        return cars.slice(start, end);
    });
}