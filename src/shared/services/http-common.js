// http-common.js
import axios from "axios";
//import {authenticationInterceptor} from "../../tracker-mobility/security/services/authentication.interceptor.js";


/*
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const http = axios.create({ baseURL: API_BASE_URL });

// Sólo JSON cuando el data NO sea FormData
http.interceptors.request.use(config => {
    // Si vamos a enviar FormData, borramos el Content-Type
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    } else {
        config.headers["Content-Type"] = "application/json";
    }
    return authenticationInterceptor(config);
});

export default http;
*/


