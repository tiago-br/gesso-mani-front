import React, { Component } from 'react'
import apiUtil from '../../../utils/api.util'

export class DespesasProdutos extends Component {
    state={
        produtos:[],
        load:false
    }
    componentDidMount =async() =>{
        const produtos = await apiUtil.getProduto()
        this.setState({
            load:true,
            produtos
        })
    }
    render() {
        return (
            <div>
                {this.state.load?
                
                <div>test</div>
                :
                <h2>Carregando...</h2>}
            </div>
        )
    }
}

export default DespesasProdutos
