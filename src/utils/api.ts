import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export * from 'axios';

// No 'Access-Control-Allow-Origin' header is present on the requested resource
// baseURL: 'https://prof.world/api',
// params: {
//   token: '6a06cc0050374e32be51125978904bd8',
// },
