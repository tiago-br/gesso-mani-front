import React, {Component} from 'react'
import FormVenda from '../../components/privado/venda/FormVenda'
import NavbarUser from '../../components/privado/NavbarUser'
import ProdutosVenda from '../../components/privado/venda/ProdutosVenda'
import styled from 'styled-components'
import CardProdutosVenda from '../../components/privado/venda/CardProdutosVenda'
import api from '../../utils/api.util'

const Buttons = styled.div`
display: flex;
justify-content: center;
margin-top: 2rem;
`

const Bt = styled.button`
margin: 5rem;
width: 12rem;
height: 3rem;
`
const Search = styled.input`

width: 30rem;
display: flex;
justify-content: center;

`
const ContainerSearch = styled.div`

width: 100vw;
display: flex;
justify-content: center;

`



 class VendasPage extends Component {

    state = {
        produtos : [],
        loading: false
    }

    componentDidMount = async () => {

        let {data} = await api.getProduto()
       
        this.setState({
            produtos: data,
            loading: true
        })
    
    }

    render() {
        return (
            <div>
            <NavbarUser/>
            <FormVenda/>
            <ProdutosVenda/>

            <Buttons>
            <Bt> Orçamento </Bt>
            <Bt> Venda </Bt>
            </Buttons>

            <ContainerSearch> <Search/> </ContainerSearch>
            
   

            {this.state.produtos.map(produto => <CardProdutosVenda name = {produto.name} quantidade = {produto.quantidade_em_estoque} valor = {produto.valor_de_venda} />)}
            

        </div>
        )
    }
}

export default VendasPage

