import axios from "axios";

const instance = axios.create({
    baseURL: `http://markwebdev.ru/api/v1/`,
    headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
})

export default instance