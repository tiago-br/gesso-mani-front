import React, { Component } from 'react'
import api from '../../../utils/api.util'
import './styles/EstoqueNovoProduto.css'



class EstoqueNovoProduto extends Component {
    state={
        name:"",
        quantidade_em_estoque:0,
        valor_de_venda:0,
        descricao:"",
        img_Url:"",
        msg:"",
        msgSuccess:"",
        appearMSG:true,
        msgClassInvalidName:"",
        msgInvalidName:"",
        valor_de_compra:0,
        porcentagemDeLucro:0,
        classMsgPercentagem:"default-black-msg-percentagem-estoque"
    }
    handleChange = async(e) =>{
        const {name,value}= e.target

        await this.setState({
            [name]:value
        })

        if(this.state.valor_de_compra !==0 && this.state.valor_de_venda !==0){
            const porcentagemDeLucro = ((this.state.valor_de_venda/this.state.valor_de_compra)-1)*100
            let classMsgPercentagem
            if(porcentagemDeLucro > 0){
                classMsgPercentagem="green-msg-percentagem-estoque"
            }
            if(porcentagemDeLucro < 0){
                classMsgPercentagem = "red-msg-percentagem-estoque"
            }
            await this.setState({
                porcentagemDeLucro:porcentagemDeLucro.toFixed(1),
                classMsgPercentagem
            })
        }
    }
    handleSubmit = async(e) =>{
        e.preventDefault()
        const payload ={
            name:this.state.name,
            quantidade_em_estoque:0,
            valor_de_venda:this.state.valor_de_venda,
            descricao:this.state.descricao,
            valor_de_compra:this.state.valor_de_compra,
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
                msg:`O produto "${payload.name}" já está registrado no estoque`,
                msgClassInvalidName:"msg-class-invalid-name"
             
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
                {this.state.appearMSG?
                    <form>
                        <h1 className='h1-novo-produto'>Novo Produto</h1>
                    <div>
                    <label>Nome do produto:</label>
                    <input className={this.state.msgClassInvalidName} type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div>
                    <label>Valor de compra:</label>
                    <input type="number" step="1" min="1" name="valor_de_compra" value={this.state.valor_de_compra} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label>Valor de venda:</label>
                        <div className="porcentagem-lucro-novo-produto">
                            <input type="number" name="valor_de_venda" value={this.state.valor_de_venda}onChange={this.handleChange} min="0" step="0.1"></input>
                          
                        </div>
                    </div>
                        <p id={this.state.classMsgPercentagem}>Margem de lucro:<span><strong>{this.state.porcentagemDeLucro}%</strong></span></p>
                    <div>
                    <label>Imagem URL </label>
                    <input type="text" name="img_Url" value={this.state.img_Url} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <div>
                        <label>Descrição do produto</label>
                        </div>
                    <textarea name="descricao" value={this.state.descricao} onChange={this.handleChange} rows="2" cols="40">{this.state.descricao}</textarea>
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
