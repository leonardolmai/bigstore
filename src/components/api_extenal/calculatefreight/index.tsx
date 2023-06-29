import axios from 'axios';
// meu token 'mJWEucHUmkSTDcWcMPsL5oiL1DbWlXGPg1pOihoU'

//eyJhbGciOiJSUzUxMiJ9.eyJhbWJpZW50ZSI6IlBST0RVQ0FPIiwiaWQiOiIwOTE0ODMzNTQ1MiIsInBmbCI6IlBGIiwiY3BmIjoiMDkxNDgzMzU0NTIiLCJpcCI6IjIwMC4xMzcuMi42OSwyMDAuMTM3LjIuNjkiLCJpYXQiOjE2ODgwNDY4NTksImlzcyI6InRva2VuLXNlcnZpY2UiLCJleHAiOjE2ODgxMzMyNTksImp0aSI6Ijg1NTM1ZGU3LTVmMjktNDRmOS05N2QyLWMzZGI0N2MyYWViNyJ9.sNTTrKEYLGJvJMqMaGt6O0SHzaQTXayHptEgptOIUKaGkl3_vriQn6VxP967RnD-m9g2btRPnPQucaZ9UCUl4zEIxogW3MgYcFZQQe5s96SU32PwRNxRE9k1SZJWIQUH3G0OWmswA0Wpdoc2C8fAbSke79TK9iIF9PS0fRKHCHEgCwpJbycvfWXB1ZcrZKNcAq8HIrCtJ6RRcC1FUyNCVF_lpcMWaI6lHFXUmIs9fvkmhabOYz6KJHaWd4LB6_ogVUGfA4VXeuHgMzQFe0rxrUsMZu8We-qD6uLCBc37N9WUA-5xwiVCol_pOwH51ngiiXwoBajhAKGqdZBeSRco3g
 xport async function calculateFreight(cep) {
  try {
    const response = await axios.get(`https://api.correios.com.br/frete/rest/v1/${cep}`);
    return response.data;
  } catch (error) {
    console.error('Error to calculate freight:', error);
    return null;
  }
}