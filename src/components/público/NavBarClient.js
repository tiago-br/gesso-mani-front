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

class NavBarClient extends Component {
    render() {
        return (
            <NavBar>
                <div>Logo</div>
                <NavLink to={"/"}>HOME</NavLink>
                <NavLink to={"/produtos"}>Produtos</NavLink>
                <NavLink to={"/serviços"}>Serviços</NavLink>
                <NavLink to={"/sobre"}>Sobre</NavLink>
                <NavLink to={"/contato"}>Contato</NavLink>
                <NavLink to={"/area-do-funcionario"}>Área do Funcionário</NavLink>
            </NavBar>
        )
    }
}

export default NavBarClient
