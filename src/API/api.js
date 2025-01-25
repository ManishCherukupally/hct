import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'
const client = axios.create(
    // {
    //     baseURL: 'https://hct.automactechnologies.in/'
    // }
    {
        baseURL: 'http://192.168.46.147:8000/'
    }
)

export default client