import React, { Component } from 'react'

class FatVENDAcard extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <form>
                    <div>
                    <p>{this.props.data.dia}/{this.props.data.mes}/{this.props.data.ano}</p>
                    <p>ID da venda:{this.props.id}</p>
                    </div>
                    <div>
                        <h4>Cliente: <span>{this.props.cliente}</span></h4>               
                    </div>
                    <div>
                        <h4>Vendedor: <span>{this.props.vendedor}</span></h4>               
                    </div>
                    <div>
                        <h4>Valor total: <span>R${this.props.valor_total.toLocaleString('pt-BR')}</span></h4>               
                    </div>
                </form>
            </div>
        )
    }
}

export default FatVENDAcard
