import axios from 'axios'
import { access } from 'fs'
import Cookies from 'js-cookie';
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  headers: { 'X-Company-CNPJ': process.env.NEXT_PUBLIC_COMPANY_CNPJ, },

})

export const api_user = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'X-Company-CNPJ': '00000000000000',
    'Authorization': `Bearer ${Cookies.get('accessToken')}`
  },
});
