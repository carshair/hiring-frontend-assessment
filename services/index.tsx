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

export const Request_PICS = async (num: number, size = '/200/300') => {
    try {
        const response = await fetch('https://picsum.photos/seed/picsum' + size);
        return await response.json();
    } catch(e) {
        console.error(e);
    }
}

export const GET_CARS: IApiObj = {
    path: '/cars',
    filter: (data) => data.cars
}
export const GET_CARS_DETAIL: IApiObj = {
    path: '/cars/{ID}',
}