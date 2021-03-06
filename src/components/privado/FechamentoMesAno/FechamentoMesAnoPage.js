import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import apiUtil from '../../../utils/api.util'
import Navbar from '../navbar/Navbar'
import Despesas from './Despesas'

const ContainerBackAndFechamento = styled.section`

width: 100vw;
height: 8rem;
display: flex;
align-items: center;
justify-content: space-around;
`

const ButtonBack = styled.button`
cursor: pointer;
width: 14rem;
height: 4rem;


background-color: #1D1D1C;
color: white;
border: 3px solid black;

:hover{
    background-color: #727165;
    color: black;
}

@media (max-width: 960px) {
 
   width: 8rem;
   height: 3rem;
   
 }

`

const Data = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 10rem;
height: 4rem;
background-color: #1D1D1C;
font-size: 1.2rem;
color: white;
border: 3px solid black;
@media (max-width: 960px) {
   width: 8rem;
   height: 3rem;
 }

`

const ContainerComprasAndDespesas = styled.div`

display: flex;
justify-content: space-around;
margin-top: 4rem;

`

const ButtonDespesasAndCompras = styled.button`

cursor: pointer;
width: 14rem;
height: 3rem;
background-color: #1D1D1C;
color: white;
border: 3px solid black;
:hover{
    background-color: #727165;
    color: black;
}
@media (max-width: 960px) {
   width: 50%;
   height: 3rem;
 }

`

const SectionContainerFundoCard = styled.section`
display: flex;
justify-content: center;
margin-top: 4rem;
`

const DivContainerFundoCard = styled.div`

width: 93vw;
height: 110%;

background-color: #574F43;
border: 3px solid black;
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 2rem;
`

const Card = styled.div`

display: flex;
align-items: center;
justify-content: space-around;
width: 90vw;
background-color: #1D1D1C;
height: 4rem;
margin-top: 2rem;
border-radius: 10px;
color: white;
margin-bottom: 1rem;
border: 3px solid black;
`

const Name = styled.div`
width: 10rem;
text-align: center;

@media (max-width: 960px) {
    text-align: center;
    width: 6rem;
 }

`

const DataCompra = styled.div`
width: 10rem;
text-align: center;
@media (max-width: 960px) {
    text-align: center;
    width: 6rem;
 }
`

const Quantidade = styled.div`
width: 10rem;
text-align: center;

@media (max-width: 960px) {
    text-align: center;
    width: 6rem;
 }
`

const ValorDeCompra = styled.div`
width: 10rem;
text-align: center;

@media (max-width: 960px) {
    text-align: center;
    width: 6rem;

 }
`

const ValorTotalDaCompra = styled.div`
width: 10rem;
text-align: center;

@media (max-width: 960px) {
    text-align: center;
    width: 6rem;
 }
`

const Info = styled.div`
width: 90vw ;
display: flex;
text-align: center;
justify-content: space-around;
margin-top: 3rem;
font-size:  0.8rem;
margin-bottom: 2rem;

@media (max-width: 960px) {
    margin-top: 3rem;
    font-size:  0.7rem;
 }

`
const InfoCard = styled.h1`
    width: 10rem;

    @media (max-width: 960px) {
    text-align: center;
    width: 6rem;
 }

`

class FechamentoMesAnoPage extends Component {

    state = {
        mes: this.props.match.params.mes,
        ano: this.props.match.params.ano,
        corButton: true,
        listCompras: [],
        load:false
    }

    componentDidMount = async () => {

        let compras = await apiUtil.getCompra()
        let filtered = compras.filter(compra => {
            return compra.data.split('T')[0].split('-')[0] === `${this.state.ano}` && compra.data.split('T')[0].split('-')[1] === `${this.state.mes}`
        })

        if(!filtered){
            filtered = [{compra_produtos:[]}]
        }

        await this.setState({
            listCompras: filtered,
            load:true
        })
    }

    handleButtonBack = () => {
        window.location = '/sistema/fechamento'
    }

    corButtonAtivoCompras = () => {
        if (this.state.corButton) {
            return { color: 'black', backgroundColor: '#727165' }
        } else {
            return {}
        }
    }

    corButtonAtivoDespesas = () => {
        if (!this.state.corButton) {
            return { color: 'black', backgroundColor: '#727165' }
        } else {
            return {}
        }
    }

    handleFiltrosCompras = () => {
        this.setState({
            corButton: true
        })
    }

    handleFiltrosDespesas = () => {
        this.setState({
            corButton: false
        })
    }

    data = (data) => {
        //    const ano = data.split('T')[0].split('-')[0] se algum dia por ventura quiser adicionar o ano
        const mes = data.split('T')[0].split('-')[1]
        const dia = data.split('T')[0].split('-')[2]
        return `${dia}/${mes}`
    }


    handleDeleteCard = async (id) => {
        apiUtil.deleteCompra(id)
        await setTimeout(function () { window.location.reload(); }, 1000)
    }



    render() {
        return (
            <div>
                <Navbar />
                {this.state.load?
                <>
                <ContainerBackAndFechamento>
                    <ButtonBack onClick={this.handleButtonBack}>Voltar</ButtonBack>
                    <Data>{this.state.mes}/{this.state.ano}</Data>
                    <Link to={`/sistema/fechamento/${this.state.mes}/${this.state.ano}/fechamento`}><ButtonBack>Fechamento</ButtonBack></Link>
                </ContainerBackAndFechamento>

                <ContainerComprasAndDespesas>
                    <ButtonDespesasAndCompras onClick={this.handleFiltrosCompras} style={this.corButtonAtivoCompras()}> Compras </ButtonDespesasAndCompras>
                    <ButtonDespesasAndCompras onClick={this.handleFiltrosDespesas} style={this.corButtonAtivoDespesas()} > Despesas </ButtonDespesasAndCompras>
                </ContainerComprasAndDespesas>
                <SectionContainerFundoCard>
                    <DivContainerFundoCard>
                        <Info>
                            <InfoCard>Nome</InfoCard>
                            <InfoCard>Data</InfoCard>

                            {this.state.corButton ?
                                <>
                                    <InfoCard>Quantidade</InfoCard>
                                    <InfoCard>Valor de compra</InfoCard>
                                </>
                                :
                                null
                            }

                            <InfoCard>Total</InfoCard>
                        </Info>

                        {this.state.corButton ? 
                     
                            this.state.listCompras.map(item => item.compra_produtos.map(produto => {
                            return <Card >
                                <Name>{produto.name}</Name>
                                <DataCompra>{this.data(item.data)}</DataCompra>
                                <Quantidade>{produto.quantidade}</Quantidade>
                                <ValorDeCompra>R${produto.valor_de_compra.toLocaleString('pt-BR')}</ValorDeCompra>
                                <ValorTotalDaCompra>R${(produto.quantidade * produto.valor_de_compra).toLocaleString('pt-BR')}</ValorTotalDaCompra>
                            </Card>

                        })
                        )
                            :
                            <Despesas mes={this.state.mes} ano={this.state.ano} />
                        }

                    </DivContainerFundoCard>
                </SectionContainerFundoCard>
                </>
                :
                <h1>Carregando...</h1>}

            </div>
        )
    }
}

export default FechamentoMesAnoPage
