import React, { Component } from 'react'
import styled from 'styled-components'
import './style/FaturamentoPageStyle.css'

const Card = styled.div`

display: flex;
width: 70vw;
justify-content: space-between;
align-items: center;
border: 3px solid black;
margin-top: 2rem;
border-radius: 20px;
height: 4rem;
background-color: #1D1D1C;
color: white;
font-size: 1.3rem;

`

const MesCard = styled.div`

width: 20vw;
text-align: center;


`
const ResultMes = styled.div`
width: 20vw;
text-align: center;
`

class FatMEScard extends Component {
    state={
        fatTotalMes:"",
        todasAsVendas:[]
    }
    componentDidMount = () =>{
        const valoresDasVendasMes = this.props.vendas.map(e=>e.valor_total)
        const fatTotalMes = valoresDasVendasMes.reduce((acc,current)=>{
            return acc+current
        },0)
        this.setState({
            fatTotalMes:fatTotalMes.toLocaleString('pt-BR'),
            todasAsVendas:this.props.vendas
        })
        
    }
    render() {
        return (
            <div className="container-btn-fat-mes-card" onClick={()=>this.props.click(this.state.todasAsVendas,this.props.mes)} >
                <Card >
                    <MesCard>
                    {this.props.mes}
                    </MesCard>
                    <ResultMes>
                    R${this.state.fatTotalMes}
                    </ResultMes>

                </Card>
            </div>
        )
    }
}

export default FatMEScard
