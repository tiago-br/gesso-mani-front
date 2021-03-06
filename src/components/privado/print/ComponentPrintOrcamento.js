import React, { Component } from 'react'
import './styles/stylePrintOrcamento.css'

class ComponentPrintOrcamento extends Component {
    state={
        produtos:[],
        cliente:"",
        valorTotal:0,
        status:"",
        frete:0,
        load:false,
        desconto:""
    }
    componentDidMount= () =>{
        const data = this.props.infos.data.split("-")
        const dataFormatada =` ${data[2]}/${data[1]}/${data[0]}`
        console.log(this.props.infos)
        const produtos = this.props.infos.produtos
        const valorTotalSemFrete = produtos.reduce((acc,produto)=>{
            return acc + (produto.valorUnitário * produto.quantidade)
        },0)
        let frete = this.props.infos.frete
        const valorTotalComFrete = valorTotalSemFrete + frete
        let desconto = Math.round((1-(this.props.infos.valorTotal/valorTotalComFrete))*100)
        if(desconto===0){
            desconto=""
        }else{
            desconto=`Desconto: ${desconto}%`
        }
        
        if(frete===0){
            frete = "Frete: isento"
        }else{
            frete = `Frete: R$${frete}`
        }
        this.setState({
            protudos:this.props.infos.protudos,  //<====Array com os produtos do orcamento
            cliente:this.props.infos.cliente,
            valorTotal:this.props.infos.valorTotal,
            status:this.props.infos.status,
            frete,
            load:true,
            data:dataFormatada,
            desconto
            
        })
    }
    render() {
        return (
            <div>
                {this.state.load?
                <div className="container-print-pdf-orcamento">
                    <h1>Gesso Mania</h1>
                    <h2>{this.state.status}</h2>
                    <section className="container-data-cliente-print-pdf">
                        <div>
                            <h3>Cliente: {this.state.cliente}</h3>
                            <h3>Data:{this.state.data}</h3>
                        </div>
                    </section>
                    <section className="container-table-print-pdf">
                        <table>
                            <thead>
                                <tr>
                                    <th>Protudo</th>
                                    <th>Quantidade</th>
                                    <th>Valor unitário</th>
                                    <th>Valor total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.infos.produtos.map(produto=>
                                <tr key={produto.nome}>
                                    <td>
                                        {produto.nome}
                                    </td>
                                    <td>
                                        {produto.quantidade}
                                    </td>
                                    <td>
                                        R${produto.valorUnitário.toLocaleString('pt-BR')}
                                    </td>
                                    <td>
                                        R${(produto.valorUnitário*produto.quantidade).toLocaleString('pt-BR')}
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="container-frete-valorTotal-print-pdf">
                            <div>
                                <h3>{this.state.frete}</h3>
                                <h3>{this.state.desconto}</h3>
                                <h3><span>Total: R${this.state.valorTotal.toLocaleString('pt-BR')}</span></h3>
                            </div>
                        </div>
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
