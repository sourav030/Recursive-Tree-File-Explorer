import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/files'
});

export const fetchItems = (parentId = null) => 
    api.get(parentId ? `?parentId=${parentId}` : '/');

export const createItem = (data) => 
    api.post('/', data);