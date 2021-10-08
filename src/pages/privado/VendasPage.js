import React, { Component } from 'react'
import FormVenda from '../../components/privado/venda/FormVenda'
import NavbarUser from '../../components/privado/NavbarUser'
import ProdutosVenda from '../../components/privado/venda/ProdutosVenda'
import styled, { StyleSheetManager } from 'styled-components'
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
const Label = styled.label`

position: absolute;
top: 0;
display: block;
transition: 0.2s;
font-size: 1rem;
color: gray; 

`
const Search = styled.input`

 
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid black;
  outline: 0;
  font-size: 1.3rem;
  color: black;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;

    :focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: black;
    font-weight:700;    
  }
  padding-bottom: 6px;  
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, black,red);
  border-image-slice: 1;
}


  
}

`
const ContainerSearch = styled.div`

width: 100vw;
display: flex;
justify-content: center;
`
const WidthInput = styled.div`
position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 40%;
`
const ContainerInfo = styled.div`

display: flex;
justify-content: space-between;
align-items: center;
margin: 2rem;



h3{
    text-align: center;
    width: 12rem;
}

`

class VendasPage extends Component {

    state = {
        listProdutos: [],
        produtos: [],
        loading: false,
        filterProduts: [],
        inputValue: ''
    }

    componentDidMount = async () => {

        let { data } = await api.getProduto()

        this.setState({

            produtos: data,
            filterProduts: data,
            loading: true
        })

    }

    handleProdutos = (produtos) => {
        
        const material = this.state.listProdutos
        material.push(produtos)
        this.setState({
            listProdutos: material
        })
    }
 
    handleInput = async (ev) => {
        
        const {value} = ev.target
        this.setState({
            inputValue : value
        })

        const filtered = await this.state.produtos.filter(produto => {
            
            return produto.name.toLocaleLowerCase().includes(this.state.inputValue.toLocaleLowerCase())
          })
  
         
          await this.setState({
              filterProduts : filtered
          })

        
    }

    deleteCard = async (value) => {

        

        const array = this.state.listProdutos

        const a = array.findIndex(e => e.name === value)

        array.splice(a, 1)

        await this.setState({
            produtos: array
        })
   
    }


    render() {
        
        return (
            <div>
                <NavbarUser />
                <FormVenda />
                <ProdutosVenda  deleteCard = {this.deleteCard} produto={this.state.listProdutos} />

                <Buttons>
                    <Bt> Orçamento </Bt>
                    <Bt> Venda </Bt>
                </Buttons>

                <ContainerSearch class="form__group field">
                    <WidthInput>   
                        <Search type="text" class="form__field"  placeholder="Name" name="name" id='name' value = {this.state.inputValue} onChange = {this.handleInput}/>
                        <Label for="name" class="form__label">Search</Label>
                    </WidthInput>
                </ContainerSearch>

                
                <ContainerInfo>

                    <h3>Nome</h3>
                    <h3>Quantidade</h3>
                    <h3>Valor</h3>
                    <h3>Acrescentar</h3>

                </ContainerInfo>

                {this.state.filterProduts.map(produto => {
                return <CardProdutosVenda key = {produto.name} name={produto.name} quantidade={produto.quantidade_em_estoque} valor={produto.valor_de_venda} function={this.handleProdutos} />})}


            </div>
        )
    }
}

export default VendasPage

