import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
require('dotenv').config()
const formUser = styled.form`

`

class FormNewUser extends Component {
    state={
        username:"",
        password:"",
        msg:""
    }

    handleUsername = (e) =>{
        e.preventDefault()
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
    }
    handleSubmit = async (e) =>{
        console.log('submit')
        const payload ={
            username:this.state.username,
            password:this.state.password
        }
        const usernames = await axios.get('http://localhost:5000/signup')
        const checkExistUsername = () => usernames.data.find((e)=>e.username===this.state.username)
        try{
            await axios.post('http://localhost:5000/signup',payload)
        }catch(er){
            if(this.state.username.length<=3){
                this.setState({
                     msg:'Usuário deve conter pelo menos 4 dígitos',
                     username:"",
                     password:""
                 })
            
            }
            if(checkExistUsername){
                this.setState({
                    msg:'Usuário já existente',
                    username:"",
                    password:""
                })
            }
            if(this.state.password.length !== 6){
                this.setState({
                    msg:'A senha precisa ter 6 dígitos',
                    username:"",
                    password:""
                })
            }
             
        }

        this.setState({
            username:"",
            password:""
        })

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
