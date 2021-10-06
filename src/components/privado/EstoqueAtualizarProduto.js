import React, { Component } from 'react'
import api from '../../utils/api.util'
import EstoqueCardProdutos from './EstoqueCardProdutos'
import styled from 'styled-components'

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
                <ContainerCards>
                {this.state.load?
                this.state.produtos.map(e=>
                    <EstoqueCardProdutos {...e}/>
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
