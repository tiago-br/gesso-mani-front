import React, { Component } from 'react'
import styled from 'styled-components'
import api from '../../utils/api.util'

require('dotenv').config()

const FormContainer = styled.form`

`


class FormLogin extends Component {
    state = {
        username: '',
        password: '',
        msg: ''
    }
    handleChangeLogin = (e) => {
        e.preventDefault()
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            username: this.state.username,
            password: this.state.password
        }
        try {

            await api.login(payload)
            window.location = "/sistema/novofuncionario"

        } 
        catch (e) {
            this.setState({
                msg: 'Usuário ou senha inválido',
                password: '',
                username: ''
            })
        }
    }

    render() {
        return (
            <div>
                <FormContainer>
                    <label>Usuário</label>
                    <input type='text' name='username' value={this.state.username} onChange={this.handleChangeLogin}></input>
                    <label>Senha</label>
                    <input type='password' name='password' value={this.state.password} onChange={this.handleChangeLogin}></input>
                    <button type='submit' onClick={this.handleSubmit}>Entrar</button>
                </FormContainer>
                {this.state.msg && <div>{this.state.msg}</div>}
            </div>
        )
    }
}

export default FormLogin
