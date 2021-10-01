import axios from "axios";

class Api {
    constructor(){
        this.api = axios.create({
            baseURL:'http://localhost:5000'
        })

        
    }
    
    login =  async (payload) =>{
        const {data} = await this.api.post('/login',payload)
        const {token} = data
        localStorage.setItem('token',token)
    }

    signup = async () => {

        

    }

}

export default new Api()