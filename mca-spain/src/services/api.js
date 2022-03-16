import axios from 'axios';
import { baseUrl, product, cart } from './baseUrl';

const getApiProducts = () => {
    const request = axios.get(`${baseUrl}${product}`);
    return request.then(response => response.data);
}

const getApiDetailsProduct = (id) => {
    const request = axios.get(`${baseUrl}${product}/${id}`);
    return request.then(response => response.data);
}

const getApiCart = (body) => {
    const request = axios.post(`${baseUrl}${cart}`, body);
    return request.then(response => response.data);
}

export default { getApiProducts, getApiDetailsProduct, getApiCart };