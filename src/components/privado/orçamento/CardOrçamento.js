import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../../utils/api.util'


const Container = styled.div`

margin: 2rem;
min-height: 5rem;
border: 2px solid black;
display: flex;
flex-direction: column;
justify-content: space-around;

`
const NomeDoProduto = styled.div`
text-align: center;
width: 10rem ;


`
const QuantidadeDoProduto = styled.div`
text-align: center;
width: 10rem ;

`
const ValorUnitário = styled.div`
text-align: center;
width: 10rem ;

`
const ValorTotal = styled.div`

`
const ContainerOrçamento = styled.div`
display: flex;
justify-content: space-around;
margin-top: 1rem;

`
const Valor = styled.div`
text-align: center;
width: 10rem ;
`
const InfoOrçamento = styled.div`

display: flex;
justify-content: space-around;
margin: 1rem;

`
const DownContainer = styled.div`

display: flex;
justify-content: space-around;
margin-top: 1.5rem;
margin-bottom: 1rem;

`

class CardOrçamento extends Component {

    state = {
        cliente: "",
        data: "",
        valorTotal: 0,
        produtos: []
    }

    componentDidMount = async () => {

        let cliente = await this.props.cliente
        let data = this.props.data
        let valorTotal = this.props.valor_total
        let produtos = await this.props.produtos
        let _id = await this.props._id

        this.setState({
            cliente,
            data,
            valorTotal,
            produtos,
            id: _id
        })


    }

    deleteOrçamento = async () => {

        api.deleteOrcamento(this.state.id)
        await setTimeout(function () { window.location.reload(true); }, 1100)
    
    }

    render() {
        return (
            <Container>
                <InfoOrçamento> <h4>{this.state.cliente}</h4><h4>{this.state.data}</h4>
                </InfoOrçamento>


                {this.state.produtos.map(produtos => {
                    return (
                        <ContainerOrçamento>
                            <NomeDoProduto>{produtos.nome}</NomeDoProduto>
                            <QuantidadeDoProduto>{produtos.quantidade}</QuantidadeDoProduto>
                            <ValorUnitário>{produtos.valorUnitário}</ValorUnitário>
                            <Valor>{produtos.quantidade * produtos.valorUnitário}</Valor>
                        </ContainerOrçamento>
                    )
                })}

                <DownContainer>
                    <button onClick={this.deleteOrçamento}>Apagar</button>
                    <ValorTotal>{this.state.valorTotal}</ValorTotal>
                    <Link to = "/sistema/vendas" params = {{testvalue: "hello"}}> Vender</Link>
                </DownContainer>

            </Container>
        )
    }
}

export default CardOrçamento
