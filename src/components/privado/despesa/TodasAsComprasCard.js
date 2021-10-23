import React, { Component } from 'react'


export class TodasAsComprasCard extends Component {
    state={
        dataFormatada:'',
        verMais:false,
        verMaisMsg:'Ver mais'
    }
    componentDidMount =async ()=>{
        const data = this.props.data.split('T')[0].split('-')
        const dataFormatada = `${data[2]}/${data[1]}/${data[0]}`
        this.setState({
            dataFormatada
        })
    }
    handleChangeVerMais = () =>{
        if(this.state.verMaisMsg==='Ver mais'){
            this.setState({
                verMaisMsg:'Ver menos',
                verMais:true

            })
        }
        if(this.state.verMaisMsg==='Ver menos'){
            this.setState({
                verMaisMsg:'Ver mais',
                verMais:false
            })
        }
    }
    render() {
        return (
            <div className="card-todas-as-compras-main">
                <div>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <p>Data: {this.state.dataFormatada}</p>
                        <p>Feito por: {this.props.user}</p>
                        <p>Valor total: R${this.props.valor_total_compra.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                    <div className="btn-todas-as-compras-container-ver">
                        <button onClick={this.handleChangeVerMais}>{this.state.verMaisMsg}</button>
                    </div>
                    {this.state.verMais?
                        <>
                        <h3 style={{textAlign:'center'}}>Produtos</h3>
                        <div>
                            {this.props.compra_produtos.map(produto=>
                                <div key={produto._id}>
                                    <div className="produto-list-todas-as-compras">
                                        <p>{produto.name}</p>
                                        <p>Quantidade: {produto.quantidade}</p>
                                        <p>Valor de compra: R${produto.valor_de_compra.toLocaleString('pt-BR')}</p>
                                        <p>Valor de venda: R${produto.valor_de_venda.toLocaleString('pt-BR')}</p>
                                    </div>
                                </div>)}
                        </div>
                        </>
                        :
                        null
                    }
                    <div className="card-todas-as-compras-btn-delete">
                        <button onClick={()=>{this.props.delete(this.props._id,this.props.compra_produtos)}}><img src='https://2.bp.blogspot.com/-DqfqcqsH47M/UMixbjsQlnI/AAAAAAAAI_U/IQkIeo-wOaU/s1600/Lixeira+-+Premium+Design+3D+(1).png' alt="delete"/></button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TodasAsComprasCard
