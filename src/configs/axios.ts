import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 120000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
});

export default instance;