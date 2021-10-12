import React, { Component } from 'react'
import styled from 'styled-components'
import FormNewUser from './FormNewUser'




const ContainerForm = styled.div`
    display: flex;
    justify-content: center;
`
class SignupPage extends Component {
    render() {
        return (
            <div>
                <ContainerForm>
                    <FormNewUser/>
                </ContainerForm>
            </div>
        )
    }
}

export default SignupPage
