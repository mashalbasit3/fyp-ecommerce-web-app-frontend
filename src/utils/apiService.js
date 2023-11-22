import axios from 'axios';

const apiService = axios.create({
    baseURL: "http://localhost:9000/api/",
    withCredentials: true
})

export default apiService;