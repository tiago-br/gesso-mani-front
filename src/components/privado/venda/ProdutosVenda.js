import React, { Component } from 'react'
import styled from 'styled-components'
import CardVenda from './CardVenda'

const Container = styled.div`

border: 2px solid black;
height: 100%;
width: 90vw;
margin-left: 5vw;
margin-top: 2rem;

`
const BtDesconto = styled.button`

margin: 2rem;

`
const BtFrete = styled.button`


`
const ValorTotal = styled.div`

text-decoration: underline;
text-decoration-color: black;
text-decoration-style: double;

`
const ContainerDown = styled.div`

display: flex;
align-items: center;
justify-content: space-between;


`
const ContainerValorTotal = styled.div`
margin-right: 7rem;
`
const Descontos = styled.div`



`


class ProdutosVenda extends Component {

    state = {
        produtos: [],
        valorTotal: 0,
        desconto: false,
        entrega: false,
        nameDeleteCard: "",
    }

    componentDidMount = async () => {
        await this.setState({
            produtos: this.props.produto
        })
    }
    

    valorTotal = () => {

        let valor = 0

        // map para pegar valor total da lista de compra 
        this.state.produtos.map(produto => valor += produto.valor_unitario * produto.quantidade)

        // condição de acresentar ou retirar os 10% de desconto
        if (this.state.desconto) {

            const desconto = valor / 10

            valor = valor - desconto


        }

        // condição de acresentar ou retirar a entrega 
        if (this.state.entrega) {
            valor = valor + 30
        }

        return valor

    }

    btDesconto = () => {
        this.setState({
            desconto: !this.state.desconto
        })

    }
    btDescontoColor = () => {

        if (this.state.desconto) {
            return "green"
        }
        return "red"
    }

    btEntrega = () => {
        this.setState({
            entrega: !this.state.entrega
        })


    }

    btEntregaColor = () => {

        if (this.state.entrega) {
            return "green"
        }

        return "red"

    }





    render() {
        return (
            <Container>


                {this.state.produtos.map(produto => <CardVenda key={produto.name} name={produto.name} valor_unitario={produto.valor_unitario} quantidade={produto.quantidade} delete={this.props.deleteCard} />)}

                <ContainerDown>

                    <Descontos>
                        <BtDesconto style={{ backgroundColor: this.btDescontoColor() }} onClick={this.btDesconto}>Desconto</BtDesconto>
                        <BtFrete style={{ backgroundColor: this.btEntregaColor() }} onClick={this.btEntrega}>Entrega</BtFrete>
                    </Descontos>

                    <ContainerValorTotal>
                        <ValorTotal>Valor Total : {this.valorTotal()} </ValorTotal>
                    </ContainerValorTotal>

                </ContainerDown>

            </Container>
        )
    }
}

export default ProdutosVenda
