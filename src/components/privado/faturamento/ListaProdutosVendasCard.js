import React, { Component } from 'react'

class ListaProdutosVendasCard extends Component {
    state={
        produtos:[],
        load:false,
        status:"",
        quantidade:this.props.produtos.quantidade.toLocaleString('pt-BR'),
        valorTotal:(this.props.produtos.quantidade * this.props.produtos.valorUnitário).toLocaleString('pt-BR'),
        statusClassName:"",
    }
    componentDidMount = () =>{
        this.setState({
            produtos:this.props.produtos,
            load:true
        })
        
        if(this.props.produtos.quantidade < 0){
            let msg="retornou"
            const valorVendaTotal=this.props.produtos.quantidade * (-1)
            const valorVendaTotalFormatado=valorVendaTotal.toLocaleString('pt-BR')
            if(this.props.produtos.quantidade < -1){
                msg="retornaram"
            }
            this.setState({
                status:msg,
                quantidade:valorVendaTotalFormatado,
                valorTotal:`${valorVendaTotalFormatado} estornado`,
                statusClassName:"estorno"
            })
        }
        
        
    }
    checkVendaDevolucao = () =>{
        
    }
    render() {
        return (
            <div>
                {this.state.load?
                <div className={`container-lista-produtos-vendas-card ${this.state.statusClassName}`}>
                    <h3>{this.props.produtos.nome}</h3>
                    <ul className="faturamento-lista-ver-mais-produtos">
                        <li>Quantidade: {this.state.quantidade} {this.state.status}</li>
                        <li>Valor unitário: R${this.props.produtos.valorUnitário.toLocaleString('pt-BR')}</li>
                        <li>Valor total: R${this.state.valorTotal}</li>
                    </ul>
                </div>
                 :
                 <h3>Carregando ...</h3>
                }
            </div>
        )
    }
}

export default ListaProdutosVendasCard
