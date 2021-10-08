import React, { Component } from 'react'
import api from '../../../utils/api.util'
import EstoqueCardProdutos from './EstoqueCardProdutos'
import styled from 'styled-components'
import './styles/EstoqueCardProduto.css'

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
    }

    componentDidMount = async ()=>{
        const {data} = await api.getProduto()

        this.setState({
            load:true,
            produtos:data,
            filterProdutos:data
        })

    }
    handleSearch =async(event)=>{
        const protudos = [...this.state.produtos]

        const produtosFiltrados = protudos.filter(element=>{
            const lowNameProduct = element.name.toLowerCase()
            const lowNameSearch = event.target.value.toLowerCase()
                return lowNameProduct.includes(lowNameSearch)
        })
        console.log(produtosFiltrados)
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
