import axios from 'axios'

import * as REQUESTS from './requests'

export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'"
  }
})

export const api = { ...REQUESTS }
