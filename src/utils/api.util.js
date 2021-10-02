import axios from "axios";


class Api {
    constructor(){
        this.api = axios.create({
            baseURL: "http://localhost:5000"
        })
        this.api.interceptors.request.use(
            (config) => {
              const token = localStorage.getItem('token');
              
              
              if(token) {
                config.headers = {
                  Authorization: `Bearer ${token}`,
                }
              }
              
              return config
            },
            (error) => console.log(error)
          )
          
          this.api.interceptors.response.use(
            (response) => response,
            ((error) => {
              if (error.response.status === 400){
                
                localStorage.removeItem('token')
                window.location = "/area-do-funcionario"
              }
              throw error
            }
          )
        )
    };
    
    login =  async (payload) =>{
        const {data} = await this.api.post('/login',payload)
        const {token} = data
        localStorage.setItem('token',token)
    }

    signup = async (payload) => {

      

        await this.api.post('/signup',payload)
        
     
    }

    getUsers = async () => {

        return await this.api.get('/signup')
  
    }

}

export default new Api()