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


const ValorTotalDaCompra = styled.div`
width: 10rem;
text-align: center;

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

        const fechamentos = await apiUtil.getFechamento()

        let filtered = fechamentos.filter(fechamento => {
           
         return fechamento.data.split('T')[0].includes(`${this.state.ano}-${this.state.mes}`)
        })
        const despesasGerais = filtered.map(e=>e.DespesasGerais).flat()
        
        await this.setState({
            despesas:despesasGerais,
            load:true
        })
       

    }

    data = (data) => {
        //    const ano = data.split('T')[0].split('-')[0] se algum dia por ventura quiser adicionar o ano
        const mes = data.split('T')[0].split('-')[1]
        const dia = data.split('T')[0].split('-')[2]
        return `${dia}/${mes}`
    }




    render () {
        return (
        <>
        {this.state.load?
            <>
            {this.state.despesas.map(item =>
               {console.log(item)
                    return <Card>
                     <Name>{item.nome}</Name>
                     <DataCompra>{`${this.state.mes}/${this.state.ano}`}</DataCompra>
                     <ValorTotalDaCompra>R${item.valor}</ValorTotalDaCompra>
                 </Card>}
            )}
            </>
        :
        <h2>carregando...</h2>
        }
        </>
        )
    }
}

export default Despesas
