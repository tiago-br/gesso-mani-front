import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import styled from 'styled-components'
import Api from '../../../utils/api.util'

const ContainerGeral = styled.div`
width: 98vw;
display: flex;
justify-content: center;
align-items: center;

`
const ContainerFundo = styled.div`

margin-top: 3rem;
margin-bottom: 2rem;
height: 40rem;
width: 80vw;
border: 3px solid black;
background-color: #574F43;
display: flex;
flex-direction: column;
align-items: center;

@media (max-width: 960px) {
    height: 35rem;
    }

`

const ContainerValues = styled.div`
margin-top: 2rem;

display: flex;
width: 70vw;
justify-content: space-around;
`

const Info = styled.h1`

width: 25rem;
text-align: center;
@media (max-width: 960px) {
    font-size: 1.2rem;
    }

`

const Result = styled.h1`


width: 10rem;
text-align: center;
@media (max-width: 960px) {
    font-size: 1.2rem;
    }

`

const Hr = styled.div`

color: black;
width: 70vw;
background-color: black;
height: 2px;
margin-top: 5px;
` 

const InfoUser = styled.div`

margin-top: 2rem;
margin-bottom: 2rem;

`

const ResultTotal = styled.div`

display: flex;
justify-content: center;
border: 3px solid black;
margin-top: 3rem;
background-color: #1D1D1C;
color: white;
border-radius: 10px;
font-size: 0.9rem;
height: 4rem;
align-items: center;
@media (max-width: 960px) {
    width: 60vw;
    margin-top: 2rem;
    }

`

class FechamentoTotal extends Component {

    state = {
        mes: this.props.match.params.mes,
        ano: this.props.match.params.ano,
        fechamento: [],
        totalDespesasGerais:0
    }


    componentDidMount = async () => {

        const fechamentos = await Api.getFechamento()
        const filtered = fechamentos.filter(fechamento => {
            return fechamento.data.split('T')[0].includes(`${this.state.ano}-${this.state.mes}`)
        })

        const totalDespesasGerais = filtered[0].DespesasGerais.reduce((acc,e)=>{return acc + e.valor},0)


        this.setState({
            totalDespesasGerais,
            fechamento: filtered[0]

        })

    }

    render() {
        return (
            <div>
                <Navbar />
                <ContainerGeral>
                    <ContainerFundo>

                        <InfoUser>
                           <h1> {this.state.fechamento.user}</h1>
                        </InfoUser>
                        <ContainerValues>
                            <Info>Salario dos colaboradores </Info> <Result>R${this.state.fechamento.salarios_colaboradores}</Result>
                        </ContainerValues>
                        <Hr/>
                        <ContainerValues>
                            <Info>Aluguel do mês </Info> <Result>R${this.state.fechamento.aluguel}</Result>
                        </ContainerValues>
                        <Hr/>
                        <ContainerValues>
                            <Info>Valor total de compras</Info> <Result>R${this.state.fechamento.valor_total_compras_do_mes}</Result>
                        </ContainerValues>
                        <Hr/>
                        <ContainerValues>
                            <Info>Valor total de despesas  </Info> <Result>R${this.state.totalDespesasGerais}</Result>
                        </ContainerValues>
                        <Hr/>
                        <ContainerValues>
                            <Info>Valor total de vendas</Info> <Result>R${this.state.fechamento.valor_total_vendas_do_mes}</Result>
                        </ContainerValues>
                        <Hr/>
                        <ResultTotal>
                            <Info>Resultado Final : R${this.state.fechamento.resultado}</Info> 
                        </ResultTotal> 








                    </ContainerFundo>
                </ContainerGeral>
            </div>
        )
    }
}

export default FechamentoTotal
