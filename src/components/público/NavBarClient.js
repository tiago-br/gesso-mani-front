import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const NavBar = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 12vh;
    margin: 0;
    padding: 0;
    background-color:#1D1D1C;
  
`

const LogoHome = styled.h1`
color: white;
font-size: 1.7rem;


`

class NavBarClient extends Component {
    render() {
        return (
            <NavBar>

                <LogoHome>Gesso Mania  <i className='fab fa-firstdraft' /></LogoHome>
            </NavBar>
        )
    }
}

export default NavBarClient
