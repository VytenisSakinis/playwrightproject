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
