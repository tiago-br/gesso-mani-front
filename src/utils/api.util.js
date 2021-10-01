import axios from "axios";


class Api {
    constructor(){
        this.api = axios.create({
            baseURL: "http://localhost:5000"
        })
    this.api.interceptors.request.use({

    })
    this.api.interceptors.response.use({

    })
    }
    login =  async (payload) =>{
        const {data} = await this.api.post('')
        const {token} = data
        localStorage.setItem('token',token)
    }
}

export default new Api()