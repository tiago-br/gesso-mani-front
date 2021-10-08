import React, { Component } from 'react'
import EstoqueNovoProduto from '../../components/privado/estoque/EstoqueNovoProduto'
import NavbarUser from '../../components/privado/NavbarUser'
import styled from 'styled-components'
import EstoqueAtualizarProduto from '../../components/privado/estoque/EstoqueAtualizarProduto'


const ButtonTittle = styled.button`
    font-size: 1.2rem;
    width: 20vw;
    height: 8vh;
    background-color: gray;
    border-radius: 30px;
    display: block;
    cursor: pointer;
    &:hover{
        background-color: black;
        color: white;
    }
`
const DivButton = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;

`
const PageTittle = styled.h2`
    text-align: center;
    font-size: 2rem;
    margin-top: 1rem;
`

class EstoquePage extends Component {
    state={
        user:"",
        novoProduto:false,
        load:false
    }

    componentDidMount(){
        const user = localStorage.getItem('user')

        this.setState({
            user,
            load:true
        })
    }
    handleChangeNovoProduto=()=>{
        this.setState({
            novoProduto:true
        })
    }
    handleChangeAtualizarProduto=()=>{
        this.setState({
            novoProduto:false
        })
    }
    render() {
        
        return (
            <>  
                <NavbarUser/>
                {this.state.load ?
                <div>
                    <PageTittle>Estoque</PageTittle>
                    <DivButton>
                        <ButtonTittle onClick={this.handleChangeNovoProduto}>Novo Produto</ButtonTittle>
                        <ButtonTittle onClick={this.handleChangeAtualizarProduto}>Atualizar Produto</ButtonTittle>
                    </DivButton>
                <div>
                    {this.state.novoProduto ?
                        <EstoqueNovoProduto user={this.state.user}/>
                        :
                        <EstoqueAtualizarProduto user={this.state.user}/>
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
