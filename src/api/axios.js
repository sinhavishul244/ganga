import axios from 'axios';
import { BASE_URL } from '../secrets/links';



export default axios.create({
    baseURL: BASE_URL
})