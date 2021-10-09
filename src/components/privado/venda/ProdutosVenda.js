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
width: 9rem;
height: 2rem;

`
const BtFrete = styled.button`

width: 9rem;
height: 2rem;
`
const ValorTotal = styled.div`

text-decoration: underline;
text-decoration-color: black;
text-decoration-style: double;
font-size: 1.2rem;

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
const ContainerInfo = styled.div`

display: flex;
justify-content: space-around;
text-align: center;
margin-top: 2rem;
width: 70rem;

h3{
    width: 17rem;

}

`
const ContainerInfo2 = styled.div`

display: flex;
justify-content: center;
align-items: center;
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
    

    valorTotal =  () => {

        let valor = 0

        // map para pegar valor total da lista de compra 
        this.state.produtos.map(produto =>  valor += produto.valorUnitário * produto.quantidade)


        // condição de acresentar ou retirar os 10% de desconto
        if (this.state.desconto) {
            const desconto = valor / 10
            valor = valor - desconto
        }

        // condição de acresentar ou retirar a entrega 
        if (this.state.entrega) {
            valor = valor + 30
        }

      return valor.toLocaleString('pt-BR') 
      

    }

    btDesconto = () => {
       
        this.setState({
            desconto: !this.state.desconto
        })

        this.props.handleDesconto(this.state.desconto)

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
        
        this.props.handleEntrega(this.state.entrega)
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
<ContainerInfo2><ContainerInfo>  <h3>Delete</h3><h3>Produto</h3><h3>Quantidade</h3><h3>Valor Unidade</h3><h3>Valor</h3>    </ContainerInfo></ContainerInfo2>
                
                
                {this.state.produtos.map(produto => <CardVenda key={produto.nome} name={produto.nome} valorUnitário={produto.valorUnitário} quantidade={produto.quantidade} delete={this.props.deleteCard} />)}

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
