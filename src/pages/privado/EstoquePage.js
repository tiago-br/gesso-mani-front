import React, { Component } from 'react'
import EstoqueNovoProduto from '../../components/privado/estoque/EstoqueNovoProduto'
import NavbarUser from '../../components/privado/navbar/Navbar'
import styled from 'styled-components'
import EstoqueAtualizarProduto from '../../components/privado/estoque/EstoqueAtualizarProduto'


const ButtonTittle = styled.button`
margin-top: 2rem;
width: 15rem;
height: 3rem;
background-color: #1D1D1C;
color: white;
border: 3px solid black;
cursor: pointer;
   
`
const DivButton = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;

`
const PageTittle = styled.h2`
    text-align: center;
    font-size: 2rem;
    margin-top: 2rem;
`
const ContainerGeral = styled.div`



`

class EstoquePage extends Component {
    state = {
        user: "",
        novoProduto: false,
        load: false
    }

    componentDidMount() {
        const user = localStorage.getItem('user')

        this.setState({
            user,
            load: true
        })
    }
    handleChangeNovoProduto = () => {
        this.setState({
            novoProduto: true
        })
    }
    handleChangeAtualizarProduto = () => {
        this.setState({
            novoProduto: false
        })
    }
    render() {

        return (
            <>
                <NavbarUser />
                {this.state.load ?
                    <ContainerGeral>
                        <PageTittle>Estoque</PageTittle>
                        <DivButton>
                            {this.state.novoProduto ? <ButtonTittle onClick={this.handleChangeNovoProduto} style={{ backgroundColor: "#727165" , color: 'black' }}>Novo Produto</ButtonTittle> : <ButtonTittle onClick={this.handleChangeNovoProduto}>Novo Produto</ButtonTittle>}
                            {this.state.novoProduto ? <ButtonTittle onClick={this.handleChangeAtualizarProduto}>Atualizar Produto</ButtonTittle> : <ButtonTittle style={{ backgroundColor: "#727165" , color: 'black'}} onClick={this.handleChangeAtualizarProduto}>Atualizar Produto</ButtonTittle>}
                        </DivButton>

                        <div>
                            {this.state.novoProduto ?
                                <EstoqueNovoProduto user={this.state.user} />
                                :
                                <EstoqueAtualizarProduto user={this.state.user} />
                            }

                        </div>
                    </ContainerGeral>
                    :
                    <h1>Carregando ...</h1>
                }
            </>
        )
    }
}

export default EstoquePage
