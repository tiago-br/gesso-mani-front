import React, { Component } from 'react'
import api from '../../utils/api.util'
import EstoqueCardProdutos from './EstoqueCardProdutos'


class EstoqueAtualizarProduto extends Component {
    state={
        load:false,
        produtos:[]
        
    }

    componentDidMount = async ()=>{
        const {data} = await api.getProduto()

        this.setState({
            load:true,
            produtos:data
        })

    }
    render() {
        return (
            <div>
                {this.state.load?
                this.state.produtos.map(e=>
                    <EstoqueCardProdutos {...e}/>
                )
                :
                <h1>Carregando ...</h1>
                }
            </div>
        )
    }
}

export default EstoqueAtualizarProduto
