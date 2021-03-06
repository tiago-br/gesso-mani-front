import React, { Component } from 'react'
import FormVenda from '../../components/privado/venda/FormVenda'
import NavbarUser from '../../components/privado/navbar/Navbar'
import ProdutosVenda from '../../components/privado/venda/ProdutosVenda'
import styled from 'styled-components'
import CardProdutosVenda from '../../components/privado/venda/CardProdutosVenda'
import api from '../../utils/api.util'
import NavBarColaborador from '../../components/privado/NavBarColaborador'

const Buttons = styled.div`
display: flex;
justify-content: center;
margin-top: 2rem;

`
const Bt = styled.button`
margin: 5rem;
width: 12rem;
height: 3rem;
cursor: pointer;
background-color: #1D1D1C;
border: 3px solid black;
color: white;


:hover{
    background-color:  #727165;
    color: black;
}
@media (max-width: 960px) {
    
   width: 9rem;
   margin: 1rem;
     
   }
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
  border-image: linear-gradient(to right, black,grey);
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
margin-top: 5rem;



h3{
    text-align: center;
    width: 12rem;
}

`
const Container = styled.div`
display: flex;
justify-content: center;
margin-top: 3rem;


`
const ContainerList = styled.div`
display: flex;
flex-direction: column;
align-items: center;

background-color: #574F43;
border: 2px solid black;
height: 100%;

width: 90vw;



`
const ContainerGeral = styled.div`

background-color: #B8B4B1;
height: 100%;
margin-bottom: -2rem;

`
const ContainerCardEstoque = styled.div`

min-height: 30rem;
padding-bottom: 2rem;



`

class VendasPage extends Component {

    state = {

        listProdutos: this.props.location.state ? this.props.location.state.produtos ? this.props.location.state.produtos : [] : [],
        cliente: "",
        data: "",
        valorTotal: 0,
        produtos: [],
        loading: false,
        filterProduts: [],
        inputValue: '',
        desconto: true,
        entrega: false,
        booleanDesconto: false,
        booleanEntrega: false,
        valorDesconto: 5,
        inputDesconto: 0,
        admin: false

    }
    componentDidMount = async () => {

        let { data } = await api.getProduto()
        let checkAdmin = localStorage.getItem('admin')
        if (checkAdmin === "ebq$lS6h$@IqGbzM7jNFFZCe70gg&t*5F&9pnNRxTgPVak7Q*%") {
            await this.setState({
                admin: true
            })
        }

        this.setState({

            produtos: data,
            filterProduts: data,
            loading: true,

        })
    }

    handleProdutos = async (produtos) => {

        const material = this.state.listProdutos

        let checkProduto = false


        material.forEach(item => {
            if (item.nome === produtos.nome) {
                return checkProduto = true
            }
        })

        if (checkProduto === true) {

            let indice = material.findIndex(e => e.nome === produtos.nome)
            let novaQuantidade = parseInt(produtos.quantidade)
            let result = parseInt(material[indice].quantidade) + novaQuantidade

            material[indice].quantidade = result

            this.setState({
                listProdutos: this.state.listProdutos,
            })

            return console.log('acresentado com sucesso')
        }

        material.push(produtos)

        this.setState({
            listProdutos: material
        })
    }

    handleInput = async (ev) => {

        const { value } = ev.target
        await this.setState({
            inputValue: value
        })

        const filtered = await this.state.produtos.filter(produto => {

            return produto.name.toLocaleLowerCase().includes(this.state.inputValue.toLocaleLowerCase())
        })

        await this.setState({
            filterProduts: filtered
        })
    }

    deleteCard = async (value) => {

        const array = this.state.listProdutos

        const i = array.findIndex(e => e.nome === value)

        array.splice(i, 1)

        await this.setState({
            produtos: array
        })

    }
    // Pega nome do cliente e a data
    infoVenda = async (payload) => {
        await this.setState({
            cliente: payload.name,
            data: payload.data
        })
    }
    handleValorEntrega = (payload) => {


        let valorEntrega = parseInt(payload)

        this.setState({

            inputDesconto: valorEntrega
        })

    }
    handleValorDesconto = (payload) => {

        let valor = parseInt(payload)


        this.setState({
            valorDesconto: valor
        })
    }
    // Pega valor total na venda 
    valorTotal = () => {

        let valor = 0

        // map para pegar valor total da lista de compra 
        this.state.listProdutos.map(produto => valor += produto.valorUnit??rio * produto.quantidade)

        // condi????o de acresentar ou retirar a entrega 
        if (this.state.entrega) {
            let a = parseInt(this.state.inputDesconto)
            valor = valor + a
        }

        // condi????o de acresentar ou retirar os 10% de desconto
        if (!this.state.desconto && this.state.valorDesconto === 10) {
            const desconto = valor / 10
            valor = valor - desconto
        }

        // condi????o de acresentar ou retirar os 5% de desconto
        if (!this.state.desconto && this.state.valorDesconto === 5) {
            const desconto = valor / 20
            valor = valor - desconto
        }

        return valor
    }
    handleDesconto = (payload) => {

        this.setState({
            desconto: payload
        })
    }
    handleEntrega = (payload) => {

        this.setState({
            entrega: payload
        })
    }
    novaVenda = async () => {


        if (this.state.listProdutos.length === 0) {
            return alert('N??o tem itens para efetuar a venda')
        }

        if (this.props.location.state) {
            this.setState({
                cliente: await this.props.location.state.cliente
            })
        }

        if (!this.state.cliente) {
            await this.setState({
                cliente: "Consumidor"
            })
        }

        let material = [...this.state.listProdutos]
        const vendedor = localStorage.getItem('user')
        const cliente = this.state.cliente
        const data = this.state.data
        let valor = await this.valorTotal()

        const payload = {
            vendedor,
            cliente,
            produtos: material,
            data,
            valor_total: valor
        }

        await api.postVenda(payload)

        // Retirar a quantidade vendida do estoque
        material.forEach(produto => {

            let payload = {
                quantidade: produto.quantidade
            }

            api.putVendaParaProduto(produto.nome, payload)

        })

        this.props.history.replace({ state: [] })

        await this.setState({
            listProdutos: []
        }
        )

        await setTimeout(function () { window.location.reload(true); }, 1100)

    }

    novoOrcamento = async () => {

        if (this.state.entrega === false) {
            await this.setState({
                inputDesconto: 0
            })
        }

        if (this.state.listProdutos.length === 0) {
            return alert('N??o tem itens para efetuar o or??amento')
        }

        if (this.state.cliente.length === 0) {
            if (this.props.location.state) {
                this.setState({
                    cliente: await this.props.location.state.cliente
                })
            }
        }

        if (!this.state.cliente) {
            await this.setState({
                cliente: "Consumidor"
            })
        }

        const vendedor = localStorage.getItem('user')
        const cliente = this.state.cliente
        let material = [...this.state.listProdutos]
        const data = this.state.data
        let valor = await this.valorTotal()

        const frete = this.state.inputDesconto

        const payload = {
            vendedor,
            cliente,
            produtos: material,
            data,
            valor_total: valor,
            status: "Or??amento",
            frete
        }

        api.postOrcamento(payload)

        this.props.history.replace({ state: [] })

        await this.setState({
            listProdutos: []
        })

        await setTimeout(function () { window.location.reload(); }, 1000)

    }

    novoDevedor = async () => {
        if (this.state.entrega === false) {
            await this.setState({
                inputDesconto: 0
            })
        }

        if (this.state.listProdutos.length === 0) {
            return alert('N??o tem itens para efetuar o or??amento')
        }

        if (this.state.cliente.length === 0) {
            if (this.props.location.state) {
                this.setState({
                    cliente: await this.props.location.state.cliente
                })
            }
        }

        if (!this.state.cliente) {
            return alert('Campo cliente vazio')
        }

        const vendedor = localStorage.getItem('user')
        const cliente = this.state.cliente
        let material = [...this.state.listProdutos]
        const data = this.state.data
        let valor = await this.valorTotal()

        const frete = this.state.inputDesconto

        const payload = {
            vendedor,
            cliente,
            produtos: material,
            data,
            valor_total: valor,
            status: "Pendente",
            frete
        }

        api.postOrcamento(payload)

        this.props.history.replace({ state: [] })

        await this.setState({
            listProdutos: []
        })

        await setTimeout(function () { window.location.reload(); }, 1000)
    }


    render() {

        return (
            <ContainerGeral>
                {this.state.loading ?
                    <>
                        {this.state.admin ? <NavbarUser /> : <NavBarColaborador />}
                        <Container>
                            <ContainerList>
                                <FormVenda infoVenda={this.infoVenda} />
                                <ProdutosVenda handleValorDesconto={this.handleValorDesconto} handleValorEntrega={this.handleValorEntrega} handleDesconto={this.handleDesconto} handleEntrega={this.handleEntrega} deleteCard={this.deleteCard} produto={this.state.listProdutos} />
                            </ContainerList>
                        </Container>
                        <Buttons>
                            <Bt onClick={this.novoOrcamento}> Or??amento </Bt>

                            <Bt onClick={this.novaVenda}> Venda </Bt>

                            <Bt onClick={this.novoDevedor}> Pendente </Bt>

                        </Buttons>

                        <ContainerSearch className="form__group field">
                            <WidthInput>
                                <Search type="text" className="form__field" placeholder="Name" name="name" id='name' value={this.state.inputValue} onChange={this.handleInput} />
                                <Label forHTML="name" className="form__label">Busca</Label>
                            </WidthInput>
                        </ContainerSearch>

                        <ContainerInfo>

                            <h3>Nome</h3>
                            <h3>Quantidade</h3>
                            <h3>Valor</h3>
                            <h3>Acrescentar</h3>

                        </ContainerInfo>
                        <ContainerCardEstoque>
                        {
                            this.state.filterProduts.map(produto => {
                                return <CardProdutosVenda key={produto.name} name={produto.name} quantidade={produto.quantidade_em_estoque} valor={produto.valor_de_venda} function={this.handleProdutos} />
                            })
                        }
                        </ContainerCardEstoque>

                    </>
                    :

                    <h1>Carregando...</h1>

                }

            </ContainerGeral>

        )
    }
}

export default VendasPage

