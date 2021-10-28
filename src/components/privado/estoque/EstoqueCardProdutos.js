import React, { Component } from 'react'
import api from '../../../utils/api.util'
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
        msgDelet:"",
        quantidade:0,
        msgAdd:"",
        classMsgAdd:"",
        valor_de_compra:this.props.valor_de_compra,
        displayAtualizar:"display-button-atualizar-off",

    }

    componentDidMount(){
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
    handleEditOn = (changeMsg) =>{
            if(changeMsg==="message"){

                this.setState({
                    edit:!this.state.edit,
                    msgAdd:"",
                    displayAtualizar:"display-button-atualizar-off"

                }) 
                return 
            }else{
                this.setState({
                edit:!this.state.edit,
                msg:"",
                msgAdd:"",
                displayAtualizar:"display-button-atualizar-off"
            }) 
            }
            if(!this.state.edit){
            this.setState({
                displayAtualizar:"display-button-atualizar-off"
            })
            }else{
                this.setState({
                    displayAtualizar:""
                })
            }
    }
    handleAtualizarProduto = async (e) =>{
        e.preventDefault()
        const payload={
            name:this.state.name.trim(),
            quantidade_em_estoque:this.state.quantidade_em_estoque,
            valor_de_venda:this.state.valor_de_venda,
            descricao:this.state.descricao,
            img_Url:this.state.img_Url,
            modificado_por:this.state.modificado_por,
            valor_de_compra:this.state.valor_de_compra
        }
        try {
            if(this.state.name===""){
                throw new Error()
            }
            await api.putProduto(this.state.id,payload)
            this.setState({
                msg:"Produto atualizado com sucesso!",
                msgClass:"sucess-att-product"
                
            })
        } catch (error) {
            this.setState({
                msg:"Erro ao atualizar o produto",
                msgClass:"fail-att-product"
            })
        }
        this.handleEditOn("message")
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
        return (
            <div>
                {this.state.load?
                <>
                    <form className="form-estoque-card">
                        {this.state.openDeletBar?
                        <div className="opened-delet-bar">
                        <p>Tem certeza que quer deletar o produto <span>{this.state.name}</span> do estoque?</p>
                        <label>Abaixo, digite o nome do produto e clique em <span>confirmar</span> para excluir:</label>
                        <input type="text" name="deleteSenha" value={this.state.deleteSenha} onChange={this.handleChange} placeholder="Digite o nome do produto aqui"/>
                        <aside>{this.state.msgDelet}</aside>
                        <div className="btns-opened-delet-bar">
                        <button id="btn-delet-bar-btn-cancelar" onClick={this.handleOpenDeletBar}>Cancelar</button>
                        <button id="btn-delet-bar-confirmar" onClick={this.handleDeleteProduct}>Confirmar</button>
                        </div>
                        </div>
                        :
                        <>
                        <fieldset disabled={this.state.edit}>
                        <div className="estoque-card-fields">
                            <div className="estoque-card-field-left">
                                <div >
                                <label >Produto: </label>
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                                </div>
                                <div>
                                <label>Quantidade em estoque: </label>
                                <input type="number" step="1" min="0" name="quantidade_em_estoque" value={this.state.quantidade_em_estoque} onChange={this.handleChange} disabled={true}></input>
                                </div>
                                <div>
                                <label>Valor de compra:</label>
                                <input type="number" step="1" min="0" name="valor_de_compra" value={this.state.valor_de_compra} onChange={this.handleChange}/>
                                </div>
                                <div id="input-valor-venda-card-produto">
                                <label>Valor de venda: </label>
                                <input type="number" name="valor_de_venda" value={this.state.valor_de_venda}onChange={this.handleChange} min="0" step="0.01"></input>
                                </div>
                                <div>
                                <label>Margem de lucro:</label>
                                <input type="text" value={`${((this.state.valor_de_venda/this.state.valor_de_compra-1)*100).toFixed(1)}%`} disabled={true}></input>
                                </div>
                            </div>
                            <div className="estoque-card-field-right">
                                <label>Imagem URL: </label>
                                
                                <input type="text" name="img_Url" value={this.state.img_Url} onChange={this.handleChange}/>                              
                                                  
                                <label>Descrição do produto:</label>
                                <textarea name="descricao" value={this.state.descricao} onChange={this.handleChange} rows="2" cols="30">{this.state.descricao}</textarea>
                            </div>
                        </div>
                            </fieldset>
                            <fieldset>
                        <div className="estoque-card-bts">
                            <div>
                            <button id="btn-excluir-produto" onClick={this.handleOpenDeletBar} className={this.state.displayAtualizar}>Excluir produto</button>
                            </div>
                           <div>
                                <button id="btn-atualizar-produto" onClick={this.handleAtualizarProduto} className={this.state.displayAtualizar}>Atualizar produto</button>
                            </div>
                                <h4 className={this.state.msgClass}>{this.state.msg}</h4>
                            <div className="estoque-card-btn-editar">
                                <button type="button" onClick={this.handleEditOn}>Editar</button>
                            </div>
                            
                        </div>
                        </fieldset>
                        
                        </>
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
