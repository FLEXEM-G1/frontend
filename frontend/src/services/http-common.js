import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

export default http;