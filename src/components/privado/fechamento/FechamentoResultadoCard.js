import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class FechamentoResultadoCard extends Component {
    state={
        data:'',
        meses:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
        mesEscrito:'',
        mes:'',
        ano:''
    }
    componentDidMount = async() =>{
        const splitData = this.props.data.split('T')
        const split2Data = splitData[0].split('-')
        const mesEscrito = this.state.meses[Number(split2Data[1])-1]
        

        await this.setState({
            mesEscrito,
            mes:split2Data[1],
            ano:split2Data[0]

        })

        
    }
    render() {
        return (
            <div>
                <NavLink to={`/sistema/fechamento/${this.state.mes}/${this.state.ano}`}>
                    <div>{this.state.mes}</div>
                    <div>{this.props.resultado}</div>
                </NavLink>
            </div>
        )
    }
}

export default FechamentoResultadoCard
