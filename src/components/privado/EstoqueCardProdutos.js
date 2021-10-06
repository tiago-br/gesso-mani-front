import React, { Component } from 'react'
import styled from 'styled-components'

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
        edit:{
            disabled:"true"
        },
        load:false
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
    render() {
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
                        <button>Atualizar Produto</button>
                        </fieldset>
                        </FormCard>
                        <button onClick={this.handleEditOn}>Editar</button>
                    </ContainerProduto>
                :
                <h1>Carregando ...</h1>
                }
            </div>
        )
    }
}

export default EstoqueCardProdutos
