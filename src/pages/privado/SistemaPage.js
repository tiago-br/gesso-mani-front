import React, { Component } from 'react'
import SignupPage from '../../components/privado/funcionarios/SignupPage'
import NavbarUser from '../../components/privado/navbar/Navbar'
import '../../components/privado/funcionarios/styles/stylesFuncionarios.css'
import GerenciarFuncionarios from '../../components/privado/funcionarios/GerenciarFuncionarios'

class SistemaPage extends Component {
    state={
        signupOn:false,
        msgButton:"Criar novo usuário",
        load:false
    }
    componentDidMount = () =>{
        this.setState({
            load:true
        })
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
                {this.state.load?
                <>
                <div className="funcionarios-page-toggle-button">
                    <div>
                        <h1>Sistema</h1>
                        <button onClick={this.handleToggleButton}>{this.state.msgButton}</button>
                    </div>
                </div>
                {this.state.signupOn?
                    <SignupPage/>
                    :
                    <GerenciarFuncionarios/>
                }
                </>
                :
                <h1>Carregnado</h1>
                }
            </div>
        )
    }
}

export default SistemaPage
