import axios from 'axios';

async function fetchData(propiedad) {
  try {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/${propiedad}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

export { fetchData };