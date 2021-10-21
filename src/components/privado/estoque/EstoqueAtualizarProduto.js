import React, { Component } from 'react'
import api from '../../../utils/api.util'
import EstoqueCardProdutos from './EstoqueCardProdutos'
import styled from 'styled-components'
import './styles/EstoqueCardProduto.css'
import { FaBeer } from 'react-icons/fa';
import { GoQuestion } from "react-icons/go";
//

const ContainerCards = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`


class EstoqueAtualizarProduto extends Component {
    state={
        load:false,
        produtos:[],
        filterProdutos:[],
        valorTotalEstoque:0
    }

    componentDidMount = async ()=>{
        const {data} = await api.getProduto()
        const copyData = [...data]
        let valorTotalEstoque = copyData.reduce((acc,produto)=>{
            console.log(produto)
            return acc + (produto.valor_de_venda * produto.quantidade_em_estoque)
        },0)
        if(valorTotalEstoque < 0){
            valorTotalEstoque = 0
        }
        this.setState({
            load:true,
            produtos:data.reverse(),
            filterProdutos:data,
            valorTotalEstoque:valorTotalEstoque.toLocaleString('pt-BR')
        })

    }
    handleSearch =async(event)=>{
        const protudos = [...this.state.produtos]

        const produtosFiltrados = protudos.filter(element=>{
            const lowNameProduct = element.name.toLowerCase()
            const lowNameSearch = event.target.value.toLowerCase()
                return lowNameProduct.includes(lowNameSearch)
        })
        await this.setState({
            filterProdutos:produtosFiltrados
        })
    }
    cards = async() =>{

        const products = await this.state.filterProdutos.map(e=>{
            return <EstoqueCardProdutos {...e}/>}
        )
        return products
    }
    
    render() {
        return (
            <div>
                <div className="container-search-bar-att">
                    <input type="text" placeholder="Barra de pesquisa" name="searchBar" onChange={(e)=>{this.handleSearch(e)}}/>
                </div>
                <div style={{textAlign:"center", marginTop:"2vh"}}>
                    <h4>Valor total do estoque:R${this.state.valorTotalEstoque} <span id="icon-hover-total-estoque"><GoQuestion/><span>Quantia total referente ao <strong>Valor de venda</strong></span></span></h4>
                </div>
                <ContainerCards>
                {this.state.load?
                    this.state.filterProdutos.map(e=>{
                        return <EstoqueCardProdutos {...e} key={e._id}/>}
                    )
                :
                    <h1>Carregando ...</h1>
                }
                </ContainerCards>
            </div>
        )
    }
}

export default EstoqueAtualizarProduto
