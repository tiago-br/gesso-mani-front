import React, { Component } from 'react'
import styled from 'styled-components'
import {FiDelete} from 'react-icons/fi'

const Section = styled.section`
margin-top: 2rem;
display: flex;
justify-content: space-around;

h4{
width: 18vw;
text-align: center;
}

`
const Card = styled.div`
width: 85vw;
display: flex;
align-items: center;
border: 3px solid black;
border-radius: 20px;
height: 3rem;
background-color: #1D1D1C;
color: white;
`

class CardCompra extends Component {
   
    handleDelete =  () => {
        this.props.deleteCard(this.props.name)
    }   

    render() {
        return (
            <Section>
                <Card>
                <h4 on onClick={this.handleDelete}><FiDelete></FiDelete></h4>
                <h4>{this.props.name}</h4>
                <h4>{this.props.valor_de_compra}</h4>
                <h4>{this.props.quantidade}</h4>
                <h4>{this.props.valor_de_venda}</h4>
                </Card>
            </Section>
        )
    }
}

export default CardCompra
