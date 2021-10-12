import React, { Component } from 'react'
import SignupPage from '../../components/privado/funcionarios/SignupPage'
import NavbarUser from '../../components/privado/NavbarUser'
import '../../components/privado/funcionarios/styles/stylesFuncionarios.css'

class FuncionariosPage extends Component {
    state={
        signupOn:false
    }
    render() {
        return (
            <div>
                <NavbarUser/>
                <SignupPage/>
            </div>
        )
    }
}

export default FuncionariosPage
