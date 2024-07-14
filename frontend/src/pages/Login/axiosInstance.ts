
import Axios from "axios";

export const axiosInstance = Axios.create({
    baseURL: 'http://localhost:5001/api',
});

axiosInstance.interceptors.request.use((config) => {
    //getting token from local Storage
    const token = localStorage.getItem('jwtToken');

    //using token in http header
    console.log("Retrived Token: ",token);
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
},(error) => {
    return Promise.reject(error);
})
