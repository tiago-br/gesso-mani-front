import React, { Component } from 'react'
import styled from 'styled-components'
import api from '../../utils/api.util'

const FormCard = styled.form`

`

const ContainerProduto = styled.div`
`
class EstoqueCardProdutos extends Component {
    state={
        name:this.props.name,
        quantidade_em_estoque:this.props.quantidade_em_estoque,
        valor_de_venda:this.props.valor_de_venda,
        descricao:this.props.descricao,
        img_Url:this.props.img_Url,
        id:this.props._id,
        msg:"",
        edit:true,
        load:false,
        modificado_por:localStorage.getItem('user')
    }

    componentDidMount=()=>{
        this.setState({
            load:true
        })
    }
    handleChange = (e) =>{
        const {name,value}= e.target

        this.setState({
            [name]:value
        })
    }
    handleEditOn = () =>{
            this.setState({
                    edit:!this.state.edit
            })
    }
    handleAtualizarProduto = async (e) =>{
        e.preventDefault()
        const payload={
            name:this.state.name,
            quantidade_em_estoque:this.state.quantidade_em_estoque,
            valor_de_venda:this.state.valor_de_venda,
            descricao:this.state.descricao,
            img_Url:this.state.img_Url,
            modificado_por:this.state.modificado_por
        }
        try {
            await api.putProduto(this.state.id,payload)
            this.setState({
                msg:"Produto Atualizado com Sucesso",
                
            })
        } catch (error) {
            this.setState({
                msg:"Erro ao atualizar o produto",

            })
        }
        this.handleEditOn()
    }
    render() {
        console.log(this.state.modificado_por)
        return (
            
            <div>
                {this.state.load?
                    <ContainerProduto>
                        <FormCard>
                        <fieldset disabled={this.state.edit}>
                        <label>Produto</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                        <label>Quantidade em estoque</label>
                        <input type="number" step="1" min="0" name="quantidade_em_estoque" value={this.state.quantidade_em_estoque} onChange={this.handleChange}></input>
                        <label>Valor de venda</label>
                        <input type="number" name="valor_de_venda" value={this.state.valor_de_venda}onChange={this.handleChange} min="0" step="0.01"></input>
                        <label>Imagem URL </label>
                        <input type="text" name="img_Url" value={this.state.img_Url} onChange={this.handleChange}/>
                        <label>Descrição do produto</label>
                        <textarea name="descricao" value={this.state.descricao} onChange={this.handleChange} rows="8" cols="70">{this.state.descricao}</textarea>
                        <button onClick={this.handleAtualizarProduto}>Atualizar Produto</button>
                        </fieldset>
                        </FormCard>
                        <button onClick={this.handleEditOn}>Editar</button>
                        <div>{this.state.msg}</div>
                    </ContainerProduto>
                :
                <h1>Carregando ...</h1>
                }
            </div>
        )
    }
}

export default EstoqueCardProdutos
