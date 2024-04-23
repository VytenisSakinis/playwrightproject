interface User {
    username: string | undefined;
    password: string | undefined;
}

interface Api {
    url: string | undefined;
    key: string | undefined;
}

export const USER: User = {
    username: process.env.USER,
    password: process.env.PASSWORD
};

export const API: Api = {
    url: process.env.API_URL,
    key: process.env.API_KEY
};

export const URL: string | undefined = process.env.URL;

export function getRandomString(length: number, character: string) {
    const chars = character;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export const APP_URL: string | undefined = process.env.APP_URL;

export const COOKIE: string | undefined = process.env.COOKIE;

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        return array;
    }
}
