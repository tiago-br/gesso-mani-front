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
        enableEdit:false
    }
    render() {
        console.log(this.props)
        return (
            
            <div>
                <div>

                </div>
            </div>
        )
    }
}

export default EstoqueCardProdutos
