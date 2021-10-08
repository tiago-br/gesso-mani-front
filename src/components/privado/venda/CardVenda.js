import React, { Component } from 'react'
import styled from 'styled-components'



const Card = styled.div`

display: flex;
justify-content: space-around;
align-items: center;
height: 3rem;
border: 1px solid black;
margin: 2rem;
border-radius: 20px;

`
const Name = styled.div`



`
const Valor_Unitario = styled.div`



`
const Quantidade = styled.div`



`
const ButtonDelete = styled.div`

` 
const ValorTotal = styled.div`
`



class CardVenda extends Component {

    state = {
        produtos : []
    }

    handleDelete = () => {

        this.props.delete(this.props.name)

    }
    
    
    render() {
        return (
            <Card>
                <ButtonDelete onClick = {this.handleDelete}>X</ButtonDelete>
                <Name>{this.props.name}</Name>
                <Quantidade>{this.props.quantidade}</Quantidade>
                <Valor_Unitario>{this.props.valorUnitário}</Valor_Unitario>
                <ValorTotal>{this.props.valorUnitário * this.props.quantidade}</ValorTotal>
                
            </Card>
        )
    }
}

export default CardVenda
