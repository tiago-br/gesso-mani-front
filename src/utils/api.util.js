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
      localStorage.setItem('user', payload.username)
    }

    signup = async (payload) => {

      await this.api.post('/signup',payload)
    }

    getUsers = async () => {

      return await this.api.get('/signup')
    }
    // orçamento route metodos:
      //metodo delete
    deleteOrcamento = async (id) =>{

      await this.api.delete(`/orcamento/${id}`)

    }
      //retorna todos os orçamentos
    getOrcamento = async () =>{
      return await this.api.get('/orcamento')
    }
      //cria um novo orcamento a partir da venda
    postOrcamento = async (payload) => {
      await this.api.post('/orcamento',payload)
    }

    // produtos route metodos:
      //metodo get, pegar todos os produtos 
    getProduto = async () =>{
      return await this.api.get('/produtos')
    }
      //metodo delete, deleta um orçamento inteiro de acordo com o Id
    deleteProduto = async (id) =>{
      await this.api.delete(`/produtos/${id}`)
    }
      //metodo post, cria um novo produto
    postProduto = async (payload) =>{
      await this.api.post('/produtos',payload)
    }
      //metodo put, para alterar a quantidade a partir da venda
    putVendaParaProduto = async (name,payload)=> {
      //payload é um objeto no formato {quantidade:Number}
      await this.api.put(`/produtos/${name}`,payload)
    }
      //metodo put, altera o produto inteiro a partir da aba estoque
    putProduto = async (id,payload) =>{
      await this.api.put(`/produtos/estoque/${id}`,payload)
    }
    //venda route metodos:
      //retorna todas as vendas
    getVendas = async () =>{
      return await this.api.get('/vendas')
    }
      //post, cria uma nova venda
    postVenda = async (payload) => {
      await this.api.post('/vendas', payload)
    }
      //delete a venda inteira 
    deleteVenda = async (id) =>{
      await this.api.delete(`/vendas/${id}`)
    }
      //delete um produto da venda
    deleteUmProdutoVenda = async (idVenda,idProduto) =>{
      await this.api.delete(`/vendas/${idVenda}/${idProduto}`)
    }
      //metodo put para alterar a quantidade de um produto da venda
    putVenda = async (idVenda,idProduto,payload) =>{
      //payload deve ser um objeto no formato {quantidade: Number}
      //altera para a quantidade que for passada no payload
      await this.api.put(`/vendas/${idVenda}/${idProduto}`,payload)
    }
     //Esto route metodo put para adicionar produtos ao estoque
    putAddEstoque = async (payload,name) =>{
      await this.api.put(`/produtos/estoque/qtd/${name}`,payload)
    }
}

export default new Api()