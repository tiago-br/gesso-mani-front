import React, { Component } from 'react'
import apiUtil from '../../../utils/api.util'
import styled from 'styled-components'

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

const Delete = styled.div`
width: 10rem;
text-align: center;
cursor: pointer;
@media (max-width: 960px) {
    text-align: center;
    width: 6rem;
 }
`


class Despesas extends Component {

    state = {
        mes: this.props.mes,
        ano: this.props.ano,
        despesas: []
    }

    componentDidMount = async () => {

        const despesas = await apiUtil.getDespesa()

        let filtered = await despesas.filter(compra => {
           
         return compra.data.split('T')[0].includes(`${this.state.ano}-${this.state.mes}`)
        })

        await this.setState({
            despesas:filtered
        })

    }

    data = (data) => {
        //    const ano = data.split('T')[0].split('-')[0] se algum dia por ventura quiser adicionar o ano
        const mes = data.split('T')[0].split('-')[1]
        const dia = data.split('T')[0].split('-')[2]
        return `${dia}/${mes}`
    }

    handleDeleteCard = async (id) => {

        apiUtil.deleteDespesa(id)
        
        const despesas = await apiUtil.getDespesa()
        await this.setState({
            despesas
        })
    }


    render () {
        return (<>
            {this.state.despesas.map(item =>
                 <Card>
                     <Name>{item.name}</Name>
                     <DataCompra>{this.data(item.data)}</DataCompra>
                     <ValorTotalDaCompra>R${item.gasto_total.toLocaleString('pt-BR')}</ValorTotalDaCompra>
                    <Delete onClick={() => {this.handleDeleteCard(item._id)}}>Delete</Delete>
                 </Card>
            )}
        </>
        )
    }
}

export default Despesas
