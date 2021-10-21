import React, { Component } from 'react'
import styled from 'styled-components'
import {MdOutlineAddCircle} from 'react-icons/md'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border: 3px solid black;
margin: 2rem;
border-radius: 20px;
height: 3.7rem;
background-color: #1D1D1C;
color: white;


`
const Nome = styled.div`
text-align: center;
width: 12rem;

`
const Quantidade = styled.div`
text-align: center;
width: 12rem;
`
const Valor = styled.div`
 width: 12rem;
 text-align: center;
`

const Acresentar = styled.div`
 width: 12rem;
font-size: 2.2rem;
padding-top: 9px;
text-align: center;
cursor: pointer;

`
const InputQuantidade = styled.input`
width: 12rem;
text-align: center;
@media (max-width: 960px) {
    
    width: 4rem;
    margin-top: 0;
    }

`


class CardProdutosVenda extends Component {

    state = {
        boolean: false ,
        produtos: [],
        quantidade: Number,
    }

    handleClick = async () => {
        
        if(this.state.quantidade === Number){
            this.setState({
                boolean : !this.state.boolean
            })

            return alert(' Coloque uma quantidade na venda ')
        }

         await this.setState({
            produtos: {
                nome: this.props.name ,
                valorUnitário: this.props.valor,
                quantidade: this.state.quantidade,
            },
            boolean: !this.state.boolean,
            quantidade: Number
        })

        this.props.function(this.state.produtos)
 
    }

    handleQuantidade = () => {
    
        this.setState({
            boolean : !this.state.boolean
        })

    }

    handleInput = (ev) => {
        // ev.preventdefault()
        const {value} = ev.target
        
        this.setState({
            quantidade: value
        })
        
    }
   


    render() {
        return (
            <Container>
                
                <Nome>{this.props.name}</Nome>
                {this.state.boolean ? <InputQuantidade  type = "number" name = "quantidade" value = {this.state.quantidade} onChange = {this.handleInput} /> : <Quantidade>{this.props.quantidade}</Quantidade>}
                <Valor> {this.props.valor}</Valor>
                {this.state.boolean ? <Acresentar ><MdOutlineAddCircle style = {{color: "green"}} onClick = {this.handleClick}/></Acresentar> : <Acresentar><MdOutlineAddCircle onClick = {this.handleQuantidade}/></Acresentar>  }
                
            </Container>
        )
    }
}

export default CardProdutosVenda
