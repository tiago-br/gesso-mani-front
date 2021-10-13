import React, { Component } from 'react'
import ProdutosVenda from '../venda/ProdutosVenda'
import './styles/stylePrintOrcamento.css'

class ComponentPrintOrcamento extends Component {
    state={
        produtos:[],
        cliente:"",
        valorTotal:0,
        status:"",
        frete:0,
        load:false
    }
    componentDidMount= () =>{
        
        this.setState({
            protudos:this.props.infos.protudos,  //<====Array com os produtos do orcamento
            cliente:this.props.infos.clientes,
            valorTotal:this.props.infos.valorTotal,
            status:this.props.infos.status,
            frete:0,
            load:true
        })
    }
    render() {
        return (
            <div>
                {this.state.load?
                <div className="container-print-pdf-orcamento">
                    <h1>Gesso Mania</h1>
                    <section>
                        <table>
                            <tr>
                                <th>Protudo</th>
                                <th>Quantidade</th>
                                <th>Valor unitário</th>
                                <th>Valor total</th>
                            </tr>
                        </table>
                    </section>
                </div>
                :
                <h1>carregando</h1>
                }
            </div>
            
          
        )
    }
}

export default ComponentPrintOrcamento
