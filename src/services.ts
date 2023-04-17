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

function updateData (index: number, url: string, data = CACHE_DATA) {
    if (!data.length || index >= data.length || data[index].url) return;
    data[index].url = url;
}

export let CACHE_DATA: any[] = [];
export let CACHE_URLS: string[] = [];
const FILTER_WORDS: any[][] = [];

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

const updateAndFilterData = (start = 0, end = 50) => {
    const keys = Object.keys(FILTER_WORDS);
    let originList = CACHE_DATA;
    if (keys.length !== 0) {
        originList = CACHE_DATA.filter((item) => {
            for (let field of keys) {
                if (Array.from(FILTER_WORDS[field]).some((v) => v == item[field])) {
                    return true;
                };
            }
            return false;
        })
    }
    for (let i = start; i < end; i++) {
        updateData(i, CACHE_URLS[getRandomInt(0, CACHE_URLS.length)], originList);
    }
    return Promise.resolve(originList.slice(start, end));
}

export const getListData = (start = 0, end = 50) => {
    console.log(start, end);
    if (CACHE_DATA.length) return updateAndFilterData(start, end);
    const pics = Array(50).fill(0).map((_, i) => Request_PICS(i))
    return Promise.all([Request(GET_CARS), ...pics]).then(([cars, ...e]) => {
        CACHE_DATA = cars;
        return updateAndFilterData(start, end);
    });
}

export const getFilterData = (name: string) => {
    let list: any[] = [];
    if (name === 'year') {
        list = CACHE_DATA.map((item) => item.car_model_year);
    }
    if (name === 'brand') {
        list = CACHE_DATA.map((item) => item.car_model);
    }
    if (name === 'color') {
        list = CACHE_DATA.map((item) => item.car_color);
    }
    list = Array.from(new Set(list));
    const newList = [];
    for (let i = 0; i < list.length; i+=3) {
        newList.push([list[i]]);
        newList[newList.length - 1].push(list[i+1]);
        newList[newList.length - 1].push(list[i+2]);
    }
    return newList;
}

export const setFilterWord = (name: string, value: string, type: 'add' | 'remove') => {
    let field = '';
    if (name === 'year') {
        field = 'car_model_year';
    }
    if (name === 'brand') {
        field = 'car_model';
    }
    if (name === 'color') {
        field = 'color';
    }
    if (!FILTER_WORDS[field]) FILTER_WORDS[field] = new Set();
    if(type === 'add') FILTER_WORDS[field].add(value);
    else FILTER_WORDS[field].remove(value);
    console.log(FILTER_WORDS)
}