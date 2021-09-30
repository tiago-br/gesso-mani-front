import React, { Component } from 'react'
import styled from 'styled-components'
import FormNewUser from '../../components/privado/FormNewUser'
import NavbarUser from '../../components/privado/NavbarUser'


const Tittle = styled.h1`
    font-size: 2rem;
    text-align: center;
    margin-top: 3rem;
`
const ContainerForm = styled.div`
    display: flex;
    justify-content: center;
`
class SignupPage extends Component {
    render() {
        return (
            <div>
                <NavbarUser/>
                <Tittle>Novo Usuário</Tittle>
                <ContainerForm>
                    <FormNewUser/>
                </ContainerForm>
            </div>
        )
    }
}

export default SignupPage
