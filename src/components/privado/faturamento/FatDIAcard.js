import React, { Component } from 'react'

class FatDIAcard extends Component {
    state={
        fatDia:0
    }
    componentDidMount = async () =>{
        const listaValorTotalDia = this.props.vendas.map(venda=>venda.valor_total)
        const fatDia = listaValorTotalDia.reduce((acc,e)=>{return acc+e},0)
        await this.setState({
            fatDia:fatDia.toLocaleString('pt-BR')
        })
    }
    render() {
        
        return (
            <div>
                 <div className="container-btn-fat-mes-card" >
                <button className="btn-fat-mes-card" onClick={()=>{this.props.click("ola",this.props.dia)}}>
                    <div>
                    Dia {this.props.dia}
                    </div>
                    <div>
                    R${this.state.fatDia}
                    </div>

                </button>
            </div>
            </div>
        )
    }
}

export default FatDIAcard
