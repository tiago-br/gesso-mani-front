import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavBar = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 12vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    background-color:gray;
    a{
        text-decoration: none;
        color:black;
        font-size: 1.3rem;
    }
    a:hover{
        text-decoration: none;
        color:white;
        
    }
`

class NavbarUser extends Component {
    render() {
        return (
            
            <NavBar>
                <div>Logo</div>
                <NavLink to={"/sistema/vendas"}>Vendas</NavLink>
                <NavLink to={"/sistema/orçamento"}>Orçamento</NavLink>
                <NavLink to={"/sistema/estoque"}>Estoque</NavLink>
                <NavLink to={"/sistema/faturamento"}>Faturamento</NavLink>
                <NavLink to={"/sistema/novofuncionario"}>Novo Funcionário</NavLink>
            </NavBar>
        )
    }
}

export default NavbarUser
