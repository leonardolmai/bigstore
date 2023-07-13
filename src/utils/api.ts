import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  headers: { 'X-COMPANY-CNPJ': process.env.NEXT_PUBLIC_COMPANY_CNPJ, },

})

