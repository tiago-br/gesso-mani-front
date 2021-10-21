import React, { Component } from 'react'
import styled from 'styled-components'
import CardVenda from './CardVenda'
import { FaEdit } from 'react-icons/fa'

const Container = styled.div`

height: 100%;
width: 90vw;

margin-top: 2rem;

`
const BtDesconto = styled.button`

width: 9rem;
height: 2rem;
cursor: pointer;

`
const BtFrete = styled.button`

width: 9rem;
height: 2rem;
cursor: pointer;
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
display: flex;
align-items: center;
margin-left: 2rem;

`
const Edit = styled.div`

font-size: 1rem;
cursor: pointer;

`
const ContainerEdit = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
text-align: center;
width: 17vw;
height: 5rem;
margin-left: 1rem;
`

const ContainerInfo = styled.div`

display: flex;
justify-content: space-around;
text-align: center;
margin-top: 2rem;
width: 70rem;

h3{
    width: 17vw;


}

`
const ContainerInfo2 = styled.div`

display: flex;
justify-content: center;
align-items: center;
`

const Input = styled.input`
text-align: center;
width:5rem;


`
const ContainerButton = styled.div`

display: flex;
justify-content: center;
width: 10rem;

`

const Button = styled.button`

width: 2.3rem;
height: 1.5rem;
margin: 1rem;
background-color: gray;
cursor: pointer;

`


class ProdutosVenda extends Component {

    state = {
        produtos: [],
        valorTotal: 0,
        desconto: false,
        entrega: false,
        nameDeleteCard: "",
        booleanDesconto: false,
        booleanEntrega: false,
        valorDesconto: 5,
        inputDesconto: 0
    }

    componentDidMount = async () => {
        await this.setState({
            produtos: this.props.produto
        })
    }

    handleChange = async (e) => {
        e.preventDefault()

        const { value } = e.target
        await this.setState({
            inputDesconto: value
        })

        this.props.handleValorEntrega(this.state.inputDesconto)

    }

    valorTotal = () => {


        let valor = 0


        // map para pegar valor total da lista de compra 
        this.state.produtos.map(produto => valor += produto.valorUnitário * produto.quantidade)

        // condição de acresentar ou retirar a entrega 
        if (this.state.entrega) {

            let a = parseInt(this.state.inputDesconto)
            valor = valor + a
        }

        // condição de acresentar ou retirar os 10% de desconto
        if (this.state.desconto && this.state.valorDesconto === 10) {

            const desconto = valor / 10
            valor = valor - desconto
        }

        // condição de acresentar ou retirar os 5% de desconto
        if (this.state.desconto && this.state.valorDesconto === 5) {

            const desconto = valor / 20
            valor = valor - desconto
        }

        return valor.toLocaleString('pt-BR')

    }

    btDesconto = () => {

        this.setState({
            desconto: !this.state.desconto,

        })

        this.props.handleDesconto(this.state.desconto)

    }

    btDescontoColor = () => {

        if (this.state.desconto) {
            return "#00cc39"
        }
        return "red"
    }

    btDescontoInput = async () => {
        this.setState({
            booleanDesconto: !this.state.booleanDesconto

        })

    }

    buttonCincoDesconto = async () => {

        await this.setState({
            valorDesconto: 5,
            booleanDesconto: false
        })
        this.props.handleValorDesconto(this.state.valorDesconto)
    }

    buttonDezDesconto = async () => {

        await this.setState({
            valorDesconto: 10,
            booleanDesconto: false
        })

        this.props.handleValorDesconto(this.state.valorDesconto)
    }

    btEntrega = async () => {

        await this.setState({
            entrega: !this.state.entrega

        })

        this.props.handleEntrega(this.state.entrega)

    }

    btEntregaColor = () => {

        if (this.state.entrega) {
            return "#00cc39"
        }

        return "red"

    }

    btEntregaInput = () => {

        this.setState({
            booleanEntrega: !this.state.booleanEntrega
        })

    }


    render() {

        return (
            <Container>
                <ContainerInfo2><ContainerInfo>  <h3>Delete</h3><h3>Produto</h3><h3>Quantidade</h3><h3>Valor Unidade</h3><h3>Valor</h3>    </ContainerInfo></ContainerInfo2>
                {this.state.produtos ? this.state.produtos.map(produto => <CardVenda key={produto.nome} name={produto.nome} valorUnitário={produto.valorUnitário} quantidade={produto.quantidade} delete={this.props.deleteCard} />) : null}
                <ContainerDown>
                    <Descontos>
                        <ContainerEdit>
                            {this.state.booleanDesconto ? <ContainerButton><Button onClick={this.buttonCincoDesconto}>5%</Button>   <Button onClick={this.buttonDezDesconto} >10%</Button></ContainerButton> : <BtDesconto style={{ backgroundColor: this.btDescontoColor() }} onClick={this.btDesconto}>Desconto</BtDesconto>}
                            <Edit onClick={this.btDescontoInput}><FaEdit /></Edit>
                        </ContainerEdit>
                        <ContainerEdit>
                            {this.state.booleanEntrega ? <ContainerButton ><Input name="entrega" value={this.state.inputDesconto} type="number" onChange={this.handleChange} /></ContainerButton> : <BtFrete style={{ backgroundColor: this.btEntregaColor() }} onClick={this.btEntrega}>Entrega</BtFrete>}
                            <Edit onClick={this.btEntregaInput}><FaEdit /></Edit>
                        </ContainerEdit>
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
