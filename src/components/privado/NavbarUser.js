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
        font-size: 1.1rem;
    }
    a:hover{
        text-decoration: none;
        color:white;
        
    }
`

const Div = styled.div`

    p{
        width: 8.5vw;
        text-align: center;
        font-size: 1.1rem;
    }

    button{
        border: none;
        outline: none;
        cursor: pointer;
        background-color: inherit;
    }
    button:hover{
        color: white;
    }
`

class NavbarUser extends Component {
    state={
        user:localStorage.getItem('user')
    }

    handleLogout = () =>{
        localStorage.clear()
        window.location.reload()
    }
    render() {
        return (
            
            <NavBar>
                <NavLink to={"/sistema/vendas"}>Vendas</NavLink>
                <NavLink to={"/sistema/orçamento"}>Orçamento</NavLink>
                <NavLink to={"/sistema/estoque"}>Estoque</NavLink>
                <NavLink to={"/sistema/faturamento"}>Faturamento</NavLink>
                <NavLink to={"/sistema/funcionarios"}>Funcionários</NavLink>
                <Div>
                    <p>{this.state.user} / <button onClick={this.handleLogout}>Logout</button></p>
                </Div>
                
            </NavBar>
        )
    }
}

export default NavbarUser
