import React, { Component } from 'react'
import styled from 'styled-components';
import apiUtil from '../../../utils/api.util';
import FechamentoResultadoCard from './FechamentoResultadoCard';


const Container = styled.div`
margin-top: 3rem;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
width: 100vw;
margin-bottom: 2rem;

`
const ContainerAnoSelect = styled.div`
margin-top: 1rem;
display: flex;
justify-content: center;
height: 100%;


`
const ContainerFundo = styled.div`
margin-top: 2rem;
border: 2px solid red;
width: 80vw;

background-color: #574F43 ;
border: 3px solid black;

`

const AnoSelecionado = styled.h3`

margin-top: 2rem;

`
const ContainerCard = styled.div`
display: flex;
align-items: center;
flex-direction: column;
width: 100%;


`

const ContainerValorTotal = styled.div`
display: flex;
justify-content: center;
margin-top: 2rem;
margin-bottom: 2rem;
`
const FundoResults = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
border: 3px solid black;
width: 25rem;
height: 7rem;
color: white;
background-color: #1D1D1C;
margin-top: 2rem;

`

const Results = styled.h3`

font-size: 1rem;

`
const ContainerMesLucro = styled.div`

width: 70vw;

display: flex;
justify-content: space-around;
margin-top: 2rem;

`
const InfoMesAndResult = styled.h3`

width: 10rem;
text-align: center;

`

export class FechamentoResultado extends Component {
    state = {
        meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        selectedYear: '',
        fechamentos: [],
        filterDataFechamentos: [],
        load: false,
        todosOsAnosUnicos: [],
        resultadoGeral: 0,
        resultadoAnual: 0
    }
    componentDidMount = async () => {
        const dataAtual = new Date();
        const currentYear = `${dataAtual.getFullYear()}`

        await this.setState({
            selectedYear: currentYear
        })
        let currentMonth = `${dataAtual.getMonth() + 1}`
        if (currentMonth.length < 2) {
            currentMonth = `0${dataAtual.getMonth()}`
        }
        // const mesAnoAtual = `${currentYear}-${currentMonth}`

        const fechamentos = await apiUtil.getFechamento()
        const todosOsAnos = fechamentos.map(e => {

            const splitData = e.data.split('T')
            const split2Data = splitData[0].split('-')
            return split2Data[0]
        })
        const anosUnicos = [...new Set(todosOsAnos)]
        const sortAnoUnicos = anosUnicos.map(e => Number(e)).sort((a, b) => a - b)
        await this.setState({
            todosOsAnosUnicos: sortAnoUnicos
        })
        const filterDataFechamentos = fechamentos.filter(fechamento => fechamento.data.includes(currentYear))
        const resultadoAnual = filterDataFechamentos.reduce((acc, e) => {
            return acc + e.resultado
        }, 0)
        const sortFilterDataFechamentos = filterDataFechamentos.sort((a, b) => {
            // elemento a 
            const adataSplit = a.data.split('T')
            const adata2split = adataSplit[0].split('-')
            const anovaData = adata2split[0] + adata2split[1]
            const adataNumber = parseInt(anovaData)
            //elemento b
            const bdataSplit = b.data.split('T')
            const bdata2split = bdataSplit[0].split('-')
            const bnovaData = bdata2split[0] + bdata2split[1]
            const bdataNumber = parseInt(bnovaData)
            return adataNumber - bdataNumber
        })
        await this.setState({
            fechamentos,
            filterDataFechamentos: sortFilterDataFechamentos,
            resultadoAnual: resultadoAnual
        })

        const somaTotalFechamento = fechamentos.reduce((acc, e) => {
            return acc + e.resultado
        }, 0)

        await this.setState({
            load: true,
            resultadoGeral: somaTotalFechamento
        })
    }
    handleChooseYear = async (e) => {
        const { value } = e.target

        const filterDataFechamentos = this.state.fechamentos.filter(fechamento => fechamento.data.includes(value))
        const sortFilterDataFechamentos = filterDataFechamentos.sort((a, b) => {
            // elemento a 
            const adataSplit = a.data.split('T')
            const adata2split = adataSplit[0].split('-')
            const anovaData = adata2split[0] + adata2split[1]
            const adataNumber = parseInt(anovaData)
            //elemento b
            const bdataSplit = b.data.split('T')
            const bdata2split = bdataSplit[0].split('-')
            const bnovaData = bdata2split[0] + bdata2split[1]
            const bdataNumber = parseInt(bnovaData)
            return adataNumber - bdataNumber
        })
        const resultadoAnual = filterDataFechamentos.reduce((acc, e) => {
            return acc + e.resultado
        }, 0)
        await this.setState({
            selectedYear: value,
            filterDataFechamentos: sortFilterDataFechamentos,
            resultadoAnual
        })
    }
    render() {

        return (

            <Container>
                {this.state.load ?
                    <div>
                        <h2>Resultado</h2>
                        <div>


                            <ContainerAnoSelect>
                                <h3>Selecione um ano:  </h3>

                                <select name="year" value={this.state.selectedYear} onChange={this.handleChooseYear}>
                                    {
                                        this.state.todosOsAnosUnicos.map(ano =>
                                            <option key={ano} value={ano}>{`${ano}`}</option>

                                        )
                                    }
                                </select>
                            </ContainerAnoSelect>

                        </div>
                        <ContainerFundo>
                            <div>
                                <AnoSelecionado>{this.state.selectedYear}</AnoSelecionado>
                                <ContainerCard>
                                    <ContainerMesLucro>
                                        <InfoMesAndResult>Mês</InfoMesAndResult>
                                        <InfoMesAndResult>Resultado</InfoMesAndResult>
                                    </ContainerMesLucro>
                                    {this.state.filterDataFechamentos.map(fechamento =>
                                        <FechamentoResultadoCard {...fechamento} key={fechamento._id} />)
                                    }
                                </ContainerCard>
                            </div>

                            <ContainerValorTotal>
                                <FundoResults>
                                    <Results>Resultado {this.state.selectedYear}: R${this.state.resultadoAnual.toLocaleString('pt-BR')}</Results>
                                    <Results>Resultado total: R${this.state.resultadoGeral.toLocaleString('pt-BR')}</Results>
                                </FundoResults>
                            </ContainerValorTotal>

                        </ContainerFundo>
                    </div>

                    :
                    <h1>Carregando...</h1>
                }
            </Container>
        )
    }
}

export default FechamentoResultado
