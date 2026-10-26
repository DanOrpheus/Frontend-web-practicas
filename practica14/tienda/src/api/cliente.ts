import axios from 'axios';

// La única instancia de Axios de toda la tienda: ningún componente importa Axios.
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});