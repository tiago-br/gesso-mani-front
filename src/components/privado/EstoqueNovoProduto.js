import React, { Component } from 'react'
import styled from 'styled-components'


const Titulo = styled.h1`
    font-size: 2rem;
    color: black;
    text-align: center;
    margin-top: 5vh;
`

const Form = styled.form`
    width: 70vw;
    height: 50vh;
    font-size: 1.2rem;


`

class EstoqueNovoProduto extends Component {
    state={
        name:"",
        quantidade_em_estoque:"",
        valor_de_venda:0,
        descricao:"",
        img_Url:"",
        modificado_por:this.props.user
    }
    handleChange = (e) =>{
        const {name,value}= e.target

        this.setState({
            [name]:value
        })
    }


    render() {
        console.log(this.state.descricao)
        return (
            <div>
                <Titulo>Novo Produto</Titulo>
                <Form>
                    <label>Nome do produto</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    <label>Quantidade em estoque</label>
                    <input type="text" name="quantidade_em_estoque" value={this.state.quantidade_em_estoque} onChange={this.handleChange}></input>
                    <label>Valor de venda</label>
                    <input type="number" name="valor_de_venda" value={this.state.valor_de_venda}onChange={this.handleChange} min="0" step="0.01"></input>
                    <label>Imagem URL </label>
                    <input type="text" name="img_Url" value={this.state.img_Url} onChange={this.handleChange}/>
                    <label>Descrição do produto</label>
                    <textarea name="descricao" value={this.state.descricao} onChange={this.handleChange} rows="8" cols="80">{this.state.descricao}</textarea>
                    
                </Form>
            </div>
        )
    }
}

export default EstoqueNovoProduto
