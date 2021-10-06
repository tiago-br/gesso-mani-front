import React, { Component } from 'react'
import styled from 'styled-components'
import api from '../../utils/api.util'
import './styles/EstoqueCardProduto.css'


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
        modificado_por:localStorage.getItem('user'),
        openDeletBar:false,
        msgClass:"",
        deleteSenha:"",
        msgDelet:""

    }

    componentDidMount=()=>{
        this.setState({
            load:true
        })
    }
    handleChange = (e) =>{
        e.preventDefault()
        const {name,value}= e.target

        this.setState({
            [name]:value
        })
    }
    handleEditOn = (e) =>{
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
            if(this.state.name==="" || this.state.quantidade_em_estoque<0){
                throw new Error()
            }
            await api.putProduto(this.state.id,payload)
            this.setState({
                msg:"Produto Atualizado com Sucesso",
                msgClass:"sucess-att-product"
                
            })
        } catch (error) {
            this.setState({
                msg:"Erro ao atualizar o produto",
                msgClass:"fail-att-product"
            })
        }
        this.handleEditOn()
    }
    handleOpenDeletBar= (e) =>{
        e.preventDefault()
        this.setState({
            openDeletBar:!this.state.openDeletBar
        })
    }
    handleDeleteProduct = async (e) =>{
        e.preventDefault()
        if(this.state.deleteSenha===this.state.name){
            try {
                await api.deleteProduto(this.state.id)
                window.location.reload()
            } catch (error) {
                this.setState({
                    msgDelet:"Erro ao deletar o item"
                })
            }
        }else{
            this.setState({
                msgDelet:"Nome digitado inválido"
            })
        }
    }
    render() {
        console.log(this.state.msgClass)
        return (
            
            <div>
                {this.state.load?
                <>
                    <form className="form-estoque-card">
                       
                        {this.state.openDeletBar?
                        <>
                        <p>Tem certeza que quer deletar o produto <span>{this.state.name}</span> do estoque?</p>
                        <label>Digite o nome do produto, e clique em confirmar para excluir o produto:</label>
                        <input type="text" name="deleteSenha" value={this.state.deleteSenha} onChange={this.handleChange}/>
                        
                        <button onClick={this.handleOpenDeletBar}>Cancelar</button>
                        <button onClick={this.handleDeleteProduct}>Confirmar</button>
                        </>
                        :
                        <>
                        <fieldset disabled={this.state.edit}>
                        <div>
                       
                            
                                <label>Produto: </label>
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                          
                            
                        <label>Quantidade em estoque: </label>
                        <input type="number" step="1" min="0" name="quantidade_em_estoque" value={this.state.quantidade_em_estoque} onChange={this.handleChange}></input>
                     

                      
                            
                                <label>Valor de venda: </label>
                                <input type="number" name="valor_de_venda" value={this.state.valor_de_venda}onChange={this.handleChange} min="0" step="0.01"></input>
                            
                            
                                <label>Imagem URL: </label>
                                <input type="text" name="img_Url" value={this.state.img_Url} onChange={this.handleChange}/>
                            
                           
                        </div>
                      
                            <label>Descrição do produto</label>
                            <textarea name="descricao" value={this.state.descricao} onChange={this.handleChange} rows="5" cols="60">{this.state.descricao}</textarea>
                            <div>
                            </div>
                            <button onClick={this.handleAtualizarProduto}>Atualizar Produto</button>
                     
                        </fieldset>
                        <h4 className={this.state.msgClass}>{this.state.msg}</h4>
                        </>
                        }
                        {this.state.openDeletBar?
                        <div>
                            <p>{this.state.msgDelet}</p>
                        </div>:
                        <div className="estoque-card-btns">
                            <button onClick={this.handleOpenDeletBar}>Excluir Produto</button>
                            <button type="button" onClick={this.handleEditOn}>Editar</button>
                        </div>
                        }
                        </form>
                    
                        
                    </>
                :
                <h1>Carregando ...</h1>
                }
            </div>
        )
    }
}

export default EstoqueCardProdutos
