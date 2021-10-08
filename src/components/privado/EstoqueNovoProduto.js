import React, { Component } from 'react'
import styled from 'styled-components'
import api from '../../utils/api.util'
import './styles/EstoqueNovoProduto.css'


class EstoqueNovoProduto extends Component {
    state={
        name:"",
        quantidade_em_estoque:1,
        valor_de_venda:0,
        descricao:"",
        img_Url:"",
        msg:"",
        msgSuccess:"",
        appearMSG:true,
        msgClassInvalidName:"",
        msgInvalidName:""
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
            modificado_por:localStorage.getItem('user'),
        }
        try {
            await api.postProduto(payload)
            this.setState({
                msgSuccess:`Produto "${payload.name}" criado com sucesso`,
                appearMSG:false,
                msg:""

            })
        } catch (error) {
            const {data} = await api.getProduto()
            const checkExist =  data.find(e=>e.name===payload.name)
            if(checkExist){
                this.setState({
                msg:`O produto "${payload.name}" já está registrado no estoque`
             
                })
            }else if(!payload.name){
                this.setState({
                    msg:'Campo "Nome do produto" precisa ser preenchido',
                    msgClassInvalidName:"msg-class-invalid-name"

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
    handleChangeForm=()=>{

        this.setState({
            msgSuccess:"",
            msg:"",
            appearMSG:true
        })
    }
    


    render() {
        console.log(this.state.descricao)
        return (
            <div className="estoque-novo-produto-container">
                <h1>Novo Produto</h1>
                {this.state.appearMSG?
                    <form>
                    <div>
                    <label>Nome do produto:</label>
                    <input className={this.state.msgClassInvalidName} type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div>
                    <label>Quantidade em estoque</label>
                    <input type="number" step="1" min="1" name="quantidade_em_estoque" value={this.state.quantidade_em_estoque} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label>Valor de venda:</label>
                    <input type="number" name="valor_de_venda" value={this.state.valor_de_venda}onChange={this.handleChange} min="0" step="0.01"></input>
                    </div>
                    <div>
                    <label>Imagem URL </label>
                    <input type="text" name="img_Url" value={this.state.img_Url} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <div>
                        <label>Descrição do produto</label>
                        </div>
                    <textarea name="descricao" value={this.state.descricao} onChange={this.handleChange} rows="4" cols="40">{this.state.descricao}</textarea>
                    </div>
                    <div>
                    <button onClick={this.handleSubmit}>Criar novo produto</button>
                    </div>
                    <p>{this.state.msg}</p>
                    </form>
                    :
                    <div className="div-msg-success-novo-produto">
                    <h1>{this.state.msgSuccess}</h1>
                    <button onClick={this.handleChangeForm}>Criar outro produto</button>
                    </div>
                    }
            </div>
        )
    }
}

export default EstoqueNovoProduto
