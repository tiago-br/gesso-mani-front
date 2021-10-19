import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../../utils/api.util'
import PrintComponent from '../print/PrintOrcamento'


const Container = styled.div`

margin: 2rem;
min-height: 5rem;
border: 2px solid black;
border-radius: 5px;
background-color: #574F43;
border: 3px solid black;

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
text-decoration: solid;


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
margin-top: 2rem;
display: flex;
justify-content: space-around;

h4{
    text-align: center;
    width: 10rem;
}
`
const NomeCliente = styled.h4`
font-size: 1.3rem;
`

const Data = styled.h4`
font-size: 1.1rem;
`
const ButtonDelete = styled.button`

width: 8rem;
height: 2rem;
background-color: #1D1D1C;
border: 3px solid black;
color: white;
cursor: pointer;

:hover{
    background-color:  #ab212e;
    box-shadow: 5px 5px 5px black;
    color: black;
}


`

const ButtonVenda = styled.button`

width: 8rem;
text-decoration: none;
height: 2rem;
color: white;
cursor: pointer;
border: 3px solid black;
background-color: #1D1D1C;

:hover{
    background-color:  #00cc39;
    box-shadow: 5px 5px 5px black;
    color: black;
}

`
const Hr = styled.div`

color: black;
width: 80vw;
background-color: black;
height: 2px;




`
const ContainerHr = styled.div`

width: auto;
display: flex;
justify-content: center;
margin-top: 1rem;


`
const PrintButton = styled.div`



`

class CardOrçamento extends Component {

    state = {
        cliente: "",
        data: "",
        valorTotal: 0,
        produtos: [],
        status: "",
        load: false,
        frete: 0
    }

    componentDidMount = async () => {

        const cliente = await this.props.cliente
        const data = await this.props.data
        const valorTotal = await this.props.valor_total
        const produtos = await this.props.produtos
        const _id = await this.props._id
        const status = await this.props.status
        const frete = this.props.frete


        await this.setState({
            cliente,
            data,
            valorTotal,
            produtos,
            id: _id,
            status,
            load: true,
            frete

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
    handleCorStatus = () => {
        if (this.state.status === "Orçamento") {
            return "green"
        }
        return "red"
    }



    render() {
        return (
            <Container>
                {this.state.load ?
                    <>
                        <ContainerClienteData>
                            <InfoOrçamento><NomeCliente>{this.state.cliente}</NomeCliente><Data>{this.dataFormatada()}</Data><Data >{this.state.status}</Data>
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
                                <>
                                <ContainerOrçamento key={produtos._id}>
                                    <NomeDoProduto>{produtos.nome}</NomeDoProduto>
                                    <QuantidadeDoProduto>{produtos.quantidade}</QuantidadeDoProduto>
                                    <ValorUnitário>{produtos.valorUnitário}</ValorUnitário>
                                    <Valor>{(produtos.quantidade * produtos.valorUnitário).toFixed(2)}</Valor>
                                </ContainerOrçamento>
                                
                                </>
                            )
                        })}

                        <ContainerOrçamento>
                            <NomeDoProduto>Taxa de entrega</NomeDoProduto>
                            <QuantidadeDoProduto></QuantidadeDoProduto>
                            <ValorUnitário></ValorUnitário>
                            <Valor>{this.state.frete}</Valor>
                        </ContainerOrçamento>
                        <ContainerHr>
                                <Hr></Hr>
                                </ContainerHr>
                        


                        <DownContainer>
                            
                            <ButtonDelete onClick={this.deleteOrçamento}>Apagar</ButtonDelete>


                            <PrintButton className="container-button-imprimir-orcamento">
                                <PrintComponent {...this.state} />
                            </PrintButton>




                            <Link style={{ textDecoration: "none", color: "black" }}
                                to={{
                                    pathname: "/sistema/vendas",
                                    state: this.state

                                }} onClick={this.deleteOrçamento}> <ButtonVenda>Vender</ButtonVenda>
                            </Link>


                            <ValorTotal>Valor Total : {this.state.valorTotal.toFixed(2)}</ValorTotal>


                        </DownContainer>
                    </>
                    :
                    <h2>Carregando...</h2>}
            </Container>
        )
    }
}

export default CardOrçamento
