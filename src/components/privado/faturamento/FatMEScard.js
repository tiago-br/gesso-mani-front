import React, { Component } from 'react'
import './style/FaturamentoPageStyle.css'

class FatMEScard extends Component {
    state={
        fatTotalMes:""
    }
    componentDidMount = () =>{
        console.log(this.props.vendas)
        const valoresDasVendasMes = this.props.vendas.map(e=>e.valor_total)
        const fatTotalMes = valoresDasVendasMes.reduce((acc,current)=>{
            return acc+current
        },0)
        this.setState({
            fatTotalMes:fatTotalMes.toLocaleString('pt-BR')
        })
        
    }
    render() {
        return (
            <div className="container-btn-fat-mes-card">
                <button className="btn-fat-mes-card">
                    <div>
                    {this.props.mes}
                    </div>
                    <div>
                    R${this.state.fatTotalMes}
                    </div>

                </button>
            </div>
        )
    }
}

export default FatMEScard
