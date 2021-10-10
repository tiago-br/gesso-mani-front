import React, { Component } from 'react'

class ListaProdutosVendasCard extends Component {
    state={
        produtos:[],
        load:false
    }
    componentDidMount = () =>{
        this.setState({
            produtos:this.props.produtos,
            load:true
        })
    }
    render() {
        return (
            <div>
                {this.state.load?
                 <h1>{this.props.produtos.nome}</h1>
                 :
                 <h3>Carregando ...</h3>
                }
            </div>
        )
    }
}

export default ListaProdutosVendasCard
