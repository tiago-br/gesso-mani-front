import React, { Component } from 'react'
import NavbarUser from '../../components/privado/NavbarUser'
import styled from 'styled-components'
import CardCompra from '../../components/privado/compra/CardCompra'
import api from '../../utils/api.util'
import CardEstoque from '../../components/privado/compra/CardEstoque'

const Input = styled.input`
display: flex;
text-align: center;
background-color: #1D1D1C;
color: white;
border: 3px solid black;
border-radius: 10px;
cursor: pointer;
margin-top: -1rem;

:focus{
  outline: none;
  background-color: white;
  color: black;
  cursor: text;
 
}

`

const Section = styled.section`
margin-top: 4rem;
display: flex;
flex-direction: column;
align-items: center;

`

const Container = styled.div`
border: 1px solid black ;
min-height: 10vh;
width: 90vw;
display: flex;
flex-direction: column;
align-items: center;
background-color: #574F43;
border: 3px solid black;

`

const Containerh3 = styled.div`
margin-top: 3rem;
display: flex;
justify-content: space-around;
width: 85vw;
margin-bottom: 2rem;

`

const H3 = styled.h3`


width: 18vw;
text-align: center;

`

const ContainerValorTotal = styled.div`


margin-top: 3rem;
margin-bottom: 2rem;
width: 80vw;
display: flex;
justify-content: flex-end;
padding-right: 4rem;
`

const Button = styled.button`

margin-top: 5rem;
width: 10rem;
height: 3rem;
background-color: #1D1D1C;
color: white;
border: 3px solid black;
cursor: pointer;
:hover{
    background-color: #727165 ;
    color: black;
    cursor: pointer;
}

`

const InputBusca = styled.input`

margin-top: 2.5rem;
margin-bottom: 2rem;
cursor: pointer;

`

const SectionEstoque = styled.section`
margin-top: 2rem;
background-color: #574F43;
border: 3px solid black;
width: 90vw;
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 10rem;
`

const ContainerInput = styled.div`

width: 100vw;
display: flex;
justify-content: center;
margin-top: 3.5rem;

`

const ContainerGeral = styled.div`

background-color: #B8B4B1 ;

`

const ContainerLista = styled.div`


width: 98vw;
background-color: #574F43;

`
const ContainerSearch = styled.div`

width: 100vw;
display: flex;
justify-content: center;
`
const WidthInput = styled.div`
position: relative;
  padding: 15px 0 0;
  margin-top: 4rem;
  width: 40%;
  margin-bottom: 4rem;
`
const Label = styled.label`

position: absolute;
top: 0;
display: block;
transition: 0.2s;
font-size: 1rem;
color: black; 

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
  border-image: linear-gradient(to right, black,#574F43);
  border-image-slice: 1;
}
}
`
const ContainerList = styled.div`
margin-bottom: 3rem;
`
const ContainerInfo = styled.div`
display: flex;
justify-content: space-around;
margin-bottom: 3rem;
width: 85vw;

h3{

width: 18vw;
text-align: center;


}
`
class ComprasPage extends Component {

    state = {
        data: '',
        listaDeCompra: [],
        estoque: [],
        inputValue: '',
        listaDeCompraFiltrada: [],
        valor_de_compra: 0,
        valor_de_venda: 0
    }

    componentDidMount = async () => {
        let date = new Date()

        let dia = date.getDate()

        let mes = date.getMonth() + 1

        let ano = date.getFullYear()

        await this.setState({
            data: `${ano}-${mes}-${dia}`
        })

        const { data } = await api.getProduto()

        await this.setState({
            estoque: data,
            listaDeCompraFiltrada: data
        })

    }

    buscarCardsDoEstoque = (payload) => {

        let listaDeCompras = this.state.listaDeCompra

        let checkProduto = false

        listaDeCompras.map(item => {
            if (item.name === payload.name) {
                return checkProduto = true
            }
        })

        if (checkProduto) {
            let indice = listaDeCompras.findIndex(e => e.name === payload.name)
            let novaQuantidade = parseInt(payload.quantidade)
            let resultado = parseInt(listaDeCompras[indice].quantidade += novaQuantidade)

            const listaDeCompraAtualizada = [{
                name: payload.name,
                valor_de_compra: payload.valor_de_compra,
                quantidade: resultado,
                valor_de_venda: payload.valor_de_venda
            }]

            return this.setState({
                listaDeCompra: listaDeCompraAtualizada
            })
        }


        const produto = {

            name: payload.name,
            quantidade: payload.quantidade,
            valor_de_compra: payload.valor_de_compra,
            valor_de_venda: payload.valor_de_venda
        }

        listaDeCompras.push(produto)

        this.setState({
            listaDeCompra: listaDeCompras
        })


    }

    handleChange = (e) => {

        this.setState({
            data: e.target.value
        })

    }

    valorTotal = () => {

        let valor = 0

        this.state.listaDeCompra.map(e => {

            let quantidadeXValor = e.valor_de_compra * e.quantidade
            valor += quantidadeXValor
        })

        return valor
    }

    enviarParaCompra = async () => {



        const valor = await this.valorTotal()
        const data = Date.parse(this.state.data)
        const user = localStorage.getItem('user')
        let material = await [...this.state.listaDeCompra]



        const payload = {
            data,
            user,
            valor_total_compra: valor,
            compra_produtos: this.state.listaDeCompra
        }




        await material.map(produto => {

            let estoque = this.state.estoque.filter(produtos => {
                return produtos.name === produto.name
            })

            let id = estoque[0]._id


            const payloadPutEstoque = {
                name: produto.name,
                quantidade_em_estoque: estoque[0].quantidade_em_estoque,
                descricao: estoque[0].descricao,
                valor_de_venda: produto.valor_de_venda,
                img_Url: estoque[0].img_Url,
                modificado_por: localStorage.getItem('user'),
                valor_de_compra: produto.valor_de_compra
            }

            api.putProduto(id, payloadPutEstoque)

        })

        await api.postCompra(payload)

        await material.map(produto => {

            const payload = {
                quantidade: produto.quantidade
            }

            return api.putAddEstoque(payload, produto.name)
        })




        this.setState({
            data: '',
            listaDeCompra: []
        })

    }

    deleteCard = async (value) => {


        const array = this.state.listaDeCompra
        const i = array.findIndex(e => e.name === value)
        array.splice(i, 1)
        console.log(array)

        await this.setState({
            listaDeCompra: array
        })

    }
    handleInput = async (ev) => {

        const { value } = ev.target

        await this.setState({
            inputValue: value
        })

        let filtered = await this.state.estoque.filter(produto => {
            return produto.name.toLocaleLowerCase().includes(this.state.inputValue.toLocaleLowerCase())
        })

        await this.setState({
            listaDeCompraFiltrada: filtered
        })
    }

    render() {
        return (
            <ContainerGeral>
                <NavbarUser />




                <Section>
                    {/* <ContainerLista>  */}
                    <Container>
                        <ContainerInput><Input type='date' value={this.state.data} onChange={this.handleChange} /></ContainerInput>
                        <Containerh3>
                            <H3>Delete</H3>
                            <H3>Name</H3>
                            <H3>Valor de Compra</H3>
                            <H3>Quantidade</H3>
                            <H3>Valor da Venda</H3>
                        </Containerh3>

                        {this.state.listaDeCompra.map(compra => <CardCompra deleteCard={this.deleteCard} {...compra} />)}

                        <ContainerValorTotal><h3>Valor Total Da Compra : {this.valorTotal()}</h3></ContainerValorTotal>

                    </Container>

                    <Button onClick={this.enviarParaCompra}>Enviar</Button>
                    {/* 
                    </ContainerLista> */}



                    <SectionEstoque>

                        <ContainerSearch className="form__group field">
                            <WidthInput>
                                <Search type="text" className="form__field" placeholder="Name" name="name" id='name' value={this.state.inputValue} onChange={this.handleInput} />
                                <Label forHTML="name" className="form__label">Busca</Label>
                            </WidthInput>
                        </ContainerSearch>
                        <ContainerList>
                            <ContainerInfo>
                                <h3>Name</h3>
                                <h3>Valor de Compra</h3>
                                <h3>Quantidade</h3>
                                <h3>Valor de Venda</h3>
                                <h3>Acrescentar</h3>
                            </ContainerInfo>
                            {this.state.listaDeCompraFiltrada.map(estoque => <CardEstoque key={estoque.name} buscarCardsDoEstoque={this.buscarCardsDoEstoque} {...estoque} />)}

                        </ContainerList>

                    </SectionEstoque>

                </Section>
            </ContainerGeral>
        )
    }
}

export default ComprasPage
