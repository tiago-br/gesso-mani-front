import axios from "axios";
require('dotenv').config()

class Api {
    constructor(){
        this.api = axios.create({
            baseURL: "http://localhost:5000"
        })
    this.api.interceptors.request({

    })
    this.api.interceptors.response({

    })
    }
    login =  async (payload) =>{
        const {data} = await this.api.post('')
        const {token} = data
        localStorage.setItem('token',token)
    }
}

export default new Api()