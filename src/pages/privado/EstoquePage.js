import React, { Component } from 'react'
import EstoqueNovoProduto from '../../components/privado/estoque/EstoqueNovoProduto'
import NavbarUser from '../../components/privado/NavbarUser'
import styled from 'styled-components'
import EstoqueAtualizarProduto from '../../components/privado/estoque/EstoqueAtualizarProduto'


const ButtonTittle = styled.button`
margin-top: 2rem;
width: 15rem;
height: 3rem;
background-color: grey;
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
                    <div>
                        <PageTittle>Estoque</PageTittle>
                        <DivButton>
                            {this.state.novoProduto ? <ButtonTittle onClick={this.handleChangeNovoProduto} style={{ boxShadow: "5px 5px 5px black" }}>Novo Produto</ButtonTittle> : <ButtonTittle onClick={this.handleChangeNovoProduto}>Novo Produto</ButtonTittle>}
                            {this.state.novoProduto ? <ButtonTittle onClick={this.handleChangeAtualizarProduto}>Atualizar Produto</ButtonTittle> : <ButtonTittle style={{ boxShadow: "5px 5px 5px black" }} onClick={this.handleChangeAtualizarProduto}>Atualizar Produto</ButtonTittle>}
                        </DivButton>

                        <div>
                            {this.state.novoProduto ?
                                <EstoqueNovoProduto user={this.state.user} />
                                :
                                <EstoqueAtualizarProduto user={this.state.user} />
                            }

                        </div>
                    </div>
                    :
                    <h1>Carregando ...</h1>
                }
            </>
        )
    }
}

export default EstoquePage
