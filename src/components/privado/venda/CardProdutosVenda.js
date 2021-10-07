import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border: 2px solid black;
margin: 2rem;
border-radius: 20px;

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
font-size: 3rem;
text-align: center;

`
const InputQuantidade = styled.input`
width: 12rem;
text-align: center;

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
                name: this.props.name ,
                valor_unitario: this.props.valor,
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
                {this.state.boolean ? <Acresentar onClick = {this.handleClick}>+</Acresentar> : <Acresentar onClick = {this.handleQuantidade}>+</Acresentar>   }
                
            </Container>
        )
    }
}

export default CardProdutosVenda
