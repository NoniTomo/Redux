import axios from 'axios'

import * as REQUESTS from './requests'

export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const api = { ...REQUESTS }
