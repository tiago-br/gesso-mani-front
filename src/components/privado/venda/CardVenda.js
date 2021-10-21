import React, { Component } from 'react'
import styled from 'styled-components'
import {FiDelete} from 'react-icons/fi'



const Card = styled.div`

display: flex;
justify-content: space-around;
align-items: center;
height: 3rem;
border: 3px solid black;
margin: 2rem;
border-radius: 20px;
background-color: #1D1D1C;
color: white;
@media (max-width: 960px) {
    
   width: 99%;
   margin-left: 0;
   }
`
const Name = styled.div`

width: 18rem;
text-align: center;


`
const Valor_Unitario = styled.div`

width: 18rem;
text-align:center;

`
const Quantidade = styled.div`

width: 18rem;
text-align:center;

`
const ButtonDelete = styled.div`
width: 18rem;
text-align:center;
font-size: 1.2rem;
color: red;
cursor: pointer;
` 
const ValorTotal = styled.div`
width: 18rem;
text-align:center;

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
                <ButtonDelete onClick = {this.handleDelete}><FiDelete/></ButtonDelete>
                <Name>{this.props.name}</Name>
                <Quantidade>{this.props.quantidade}</Quantidade>
                <Valor_Unitario>{this.props.valorUnitário}</Valor_Unitario>
                <ValorTotal>{this.props.valorUnitário * this.props.quantidade}</ValorTotal>
                
            </Card>
        )
    }
}

export default CardVenda
