import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
margin-top: 2rem;
width: 70vw;
border: 3px solid black;
background-color: #1D1D1C;
border-radius: 10px;
`

const Info = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
height: 2.6rem;

`
const NameAndLucro =styled.div`
width: 10rem;
text-align: center;
`

export class FechamentoResultadoCard extends Component {
    state = {
        data: '',
        meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        mesEscrito: '',
        mes: '',
        ano: ''
    }
    componentDidMount = async () => {
        const splitData = this.props.data.split('T')
        const split2Data = splitData[0].split('-')
        const mesEscrito = this.state.meses[Number(split2Data[1]) - 1]


        await this.setState({
            mesEscrito,
            mes: split2Data[1],
            ano: split2Data[0]

        })


    }
    render() {
        return (
            <Card>
                <NavLink style={{ textDecoration: "none", color: 'white' }} to={`/sistema/fechamento/${this.state.mes}/${this.state.ano}`}>
                    <Info>
                        <NameAndLucro>{this.state.mesEscrito}</NameAndLucro>
                        <NameAndLucro>R${this.props.resultado.toLocaleString('pt-BR')}</NameAndLucro>
                    </Info>
                </NavLink>
            </Card>
        )
    }
}

export default FechamentoResultadoCard
