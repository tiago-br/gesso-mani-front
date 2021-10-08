import React, { Component } from 'react'
import './style/FaturamentoPageStyle.css'

class FatMEScard extends Component {
    state={
        fatTotalMes:""
    }
    componentDidMount = () =>{
        const valoresDasVendasMes = this.props.vendas.map(e=>e.valor_total)
        const fatTotalMes = valoresDasVendasMes.reduce((acc,current)=>{
            return acc+current
        },0)
        this.setState({
            fatTotalMes
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
                    {this.state.fatTotalMes}
                    </div>

                </button>
            </div>
        )
    }
}

export default FatMEScard
