import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../../utils/api.util'


const Container = styled.div`

margin: 2rem;
min-height: 5rem;
border: 2px solid black;
border-radius: 20px;
background-color: #E5E4E2;


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
text-decoration: underline;
text-decoration-color: black;
text-decoration-style: double;
font-size: 1.2rem;
`
const ContainerOrçamento = styled.div`
display: flex;
justify-content: space-around;
margin-top: 1.4rem;


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
margin-top: 3rem;
margin-bottom: 1rem;

`

const ContainerClienteData = styled.div`

display: flex;
flex-direction: column;
justify-content: space-around;
`
const ContainerInfo = styled.div`
margin-top: 1.3rem;
display: flex;
justify-content: space-around;

h4{
    text-align: center;
    width: 10rem;
}
`
const NomeCliente =  styled.h4`
font-size: 1.3rem;
`

const Data = styled.h4`
font-size: 1.3rem;
`
const ButtonDelete = styled.button`

width: 8rem;
height: 2rem;
background-color: grey;
cursor: pointer;

:hover{
    background-color:  #ab212e;
    box-shadow: 5px 5px 5px black;
}


`

const ButtonVenda = styled.button`

width: 8rem;
text-decoration: none;
height: 2rem;
background-color: grey;
cursor: pointer;

:hover{
    background-color:  #00cc39;
    box-shadow: 5px 5px 5px black;
}

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

        console.log(data)

        this.setState({
            cliente,
            data,
            valorTotal,
            produtos,
            id: _id
        })
       


    }
    dataFormatada = () => {
        let date = this.state.data.split("-")
        let dia = date[2]
        let mes = date[1]
        let ano = date[0]

        return `${dia}/${mes}/${ano}`
    }

    deleteOrçamento = async () => {

        api.deleteOrcamento(this.state.id)
        await setTimeout(function () { window.location.reload(true); }, 1100)

    }


    render() {
        return (
            <Container>
                <ContainerClienteData>
                    <InfoOrçamento><NomeCliente>{this.state.cliente}</NomeCliente><Data>{this.dataFormatada()}</Data>
                    </InfoOrçamento>
                </ContainerClienteData>

                <ContainerInfo>
                <h4>Nome</h4>
                <h4>Quantidade</h4>
                <h4>Valor Unitário</h4>
                <h4>Valor Total</h4>

                </ContainerInfo>

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
                    <ButtonDelete onClick={this.deleteOrçamento}>Apagar</ButtonDelete>
                    
                    <ButtonVenda><Link style = {{textDecoration : "none", color: "black"}}
                        onClick={this.deleteOrçamento}
                        to={{
                            pathname: "/sistema/vendas",
                            state: this.state
                        }}>Editar</Link></ButtonVenda>

                   <ButtonVenda><Link style = {{textDecoration : "none", color: "black"}}
                        onClick={this.deleteOrçamento}
                        to={{
                            pathname: "/sistema/vendas",
                            state: this.state
                        }}>Vender</Link></ButtonVenda> 

                    <ValorTotal>Valor Total : {this.state.valorTotal}</ValorTotal>
                   

                </DownContainer>

            </Container>
        )
    }
}

export default CardOrçamento
