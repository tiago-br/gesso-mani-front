import React, { Component } from 'react'
import DespesasGerais from '../../components/privado/despesa/DespesasGerais'
import DespesasProdutos from '../../components/privado/despesa/DespesasProdutos'
import NavbarUser from '../../components/privado/navbar/Navbar'
import '../../components/privado/despesa/styles/styleDespesas.css'


 class  DespesasPage extends Component {
     state={
         load:false,
         nome:"",
         valor:"",
         descricao:"",
         user:localStorage.getItem('user'),
         gasto_total:0,
         data:"",
         despesasGerais:true
     }
     componentDidMount = async() =>{

        this.setState({
            load:true,
        })
     }
     changeComponent = (boleean) =>{
        this.setState({
            despesasGerais:boleean
        })
     }
    render() {
        console.log(this.state.data)
        return (
            <div className="container-despesas-page">
                {this.state.load?
                <>
                <NavbarUser/>
                <div>
                    <div>
                        <h1>Despesas</h1>
                    </div>
                    <div className="container-buttons-despesa-page">
                        <div>
                            <button onClick={()=>{this.changeComponent(true)}}>Gerais</button>
                        </div>
                        <div>
                            <button onClick={()=>{this.changeComponent(false)}}>Produtos</button>
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.despesasGerais?<DespesasGerais/>:<DespesasProdutos/>}
                </div>
                
                </>
                
                
                :
                <h1>Carregando ...</h1>
                }
                
            </div>
        )
    }
}

export default  DespesasPage
