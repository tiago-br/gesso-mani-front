import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
border: 2px solid black;
margin: 2rem;
border-radius: 20px;

`
const Nome = styled.div`

width: 10rem;

`
const Quantidade = styled.div`

`
const Valor = styled.div`

`

const Acresentar = styled.div`

font-size: 3rem;

`


class CardProdutosVenda extends Component {

    state = {
        
        produtos: []
    }



    render() {
        return (
            <Container>

                <Nome>{this.props.name}</Nome>
                <Quantidade>{this.props.quantidade}</Quantidade>
                <Valor> {this.props.valor}</Valor>
                <Acresentar>+</Acresentar>
            </Container>
        )
    }
}

export default CardProdutosVenda
