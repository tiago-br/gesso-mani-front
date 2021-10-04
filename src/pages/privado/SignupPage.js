import React, { Component } from 'react'
import styled from 'styled-components'
import FormNewUser from '../../components/privado/FormNewUser'
import NavbarUser from '../../components/privado/NavbarUser'



const ContainerForm = styled.div`
    display: flex;
    justify-content: center;
`
class SignupPage extends Component {
    render() {
        return (
            <div>
                <NavbarUser/>
                
                <ContainerForm>
                    <FormNewUser/>
                </ContainerForm>
            </div>
        )
    }
}

export default SignupPage
