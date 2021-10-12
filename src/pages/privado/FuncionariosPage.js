import React, { Component } from 'react'
import SignupPage from '../../components/privado/funcionarios/SignupPage'
import NavbarUser from '../../components/privado/NavbarUser'
import '../../components/privado/funcionarios/styles/stylesFuncionarios.css'

class FuncionariosPage extends Component {
    state={
        signupOn:false,
        msgButton:"Criar novo usuário"
    }
    handleToggleButton = () =>{
        if(!this.state.signupOn){
            this.setState({
                signupOn:true,
                msgButton:"Gerenciar usuários"
            })
        }else{
            this.setState({
                signupOn:false,
                msgButton:"Criar novo usuário"
            })
        }

    }
    render() {
        return (
            <div>
                <NavbarUser/>
                <div className="funcionarios-page-toggle-button">

                    <div>
                        <h1>Funcionários</h1>
                        <button onClick={this.handleToggleButton}>{this.state.msgButton}</button>
                    </div>
                </div>
                {this.state.signupOn?
                    <SignupPage/>
                    :
                    <h1>Ola</h1>
                }
            </div>
        )
    }
}

export default FuncionariosPage
