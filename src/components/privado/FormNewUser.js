import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import api from '../../utils/api.util'
require('dotenv').config()


const formUser = styled.form`
 color:pink;
`

class FormNewUser extends Component {
    state = {
        username: "",
        password: "",
        msg: ""
    }


    handleUsername = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {


        const payload = {
            username: this.state.username,
            password: this.state.password
        }

        const usernames = await api.getUsers()
        const checkExistUsername = usernames.data.find((e) => e.username === this.state.username)


    

        try {
     
            api.signup(payload)

            this.setState({
                msg: 'Usuário criado com sucesso',
            })

            if (this.state.username.length <= 3) {
                this.setState({
                    msg: 'Usuário deve conter pelo menos 4 dígitos',
                })
            } 
            if (this.state.password.length !== 6) {
                this.setState({
                    msg: 'A senha precisa ter 6 dígitos',
                })
            } 
           if (checkExistUsername) {
                this.setState({
                    msg: 'Usuário já existente',
                })
            } 
           

        } catch (error) {
            

        }
        

    }

    render() {
        return (
            <>
                <formUser>
                    <label>Username</label>
                    <input type="text" value={this.state.username} name="username" onChange={this.handleUsername}></input>
                    <label>Senha</label>
                    <input type="password" value={this.state.password} name="password" onChange={this.handleUsername}></input>
                    <button type="submit" onClick={this.handleSubmit}>Enviar</button>
                </formUser>
                <p>{this.state.msg}</p>
            </>
        )
    }
}

export default FormNewUser
