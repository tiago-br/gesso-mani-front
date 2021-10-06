import React, { Component } from 'react'
import styled from 'styled-components'
import api from '../../utils/api.util'


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
        quantidade_em_estoque:1,
        valor_de_venda:0,
        descricao:"",
        img_Url:"",
        msg:""
    }
    handleChange = (e) =>{
        const {name,value}= e.target

        this.setState({
            [name]:value
        })
    }
    handleSubmit = async(e) =>{
        e.preventDefault()
        const payload ={
            name:this.state.name,
            quantidade_em_estoque:this.state.quantidade_em_estoque,
            valor_de_venda:this.state.valor_de_venda,
            descricao:this.state.descricao,
            img_Url:this.state.img_Url,
            modificado_por:this.props.user,
        }
        try {
            await api.postProduto(payload)
            this.setState({
                msg:`Produto "${payload.name}" criado com sucesso`
            })
        } catch (error) {
            const {data} = await api.getProduto()
            const checkExist =  data.find(e=>e.name===payload.name)
            if(checkExist){
                this.setState({
                msg:`O produto "${payload.name}" já está registrado no estoque`

                })
            }else{this.setState({
                msg:"Erro ao criar novo produto!"
            })
            }
        }
        this.setState({
            name:"",
                quantidade_em_estoque:1,
                valor_de_venda:0,
                descricao:"",
                img_Url:""
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
                    <input type="number" step="1" min="1" name="quantidade_em_estoque" value={this.state.quantidade_em_estoque} onChange={this.handleChange}></input>
                    <label>Valor de venda</label>
                    <input type="number" name="valor_de_venda" value={this.state.valor_de_venda}onChange={this.handleChange} min="0" step="0.01"></input>
                    <label>Imagem URL </label>
                    <input type="text" name="img_Url" value={this.state.img_Url} onChange={this.handleChange}/>
                    <label>Descrição do produto</label>
                    <textarea name="descricao" value={this.state.descricao} onChange={this.handleChange} rows="8" cols="70">{this.state.descricao}</textarea>
                    <button onClick={this.handleSubmit}>Criar Novo Produto</button>
                </Form>
                <p>{this.state.msg}</p>
            </div>
        )
    }
}

export default EstoqueNovoProduto
