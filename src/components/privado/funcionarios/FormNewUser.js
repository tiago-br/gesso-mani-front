import React, { Component } from 'react'

import styled from 'styled-components'
import api from '../../../utils/api.util'
require('dotenv').config()

const Container = styled.div`

width: 100vw;
height: 80vh;
display: flex;
justify-content: center;
/* align-items: center; */
/* @media only screen and (max-width: 1200px) {  
        width: 1rem;
        margin-left: -2.4rem;
        height: 98vh;
} */

`

const FormUser = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 width: 25rem;
 height: 26rem;
 margin-top: 1rem;
 background-color: #574F43;
 border: 2px solid black;

 
`
const LabelUsername = styled.label`
margin-top: 4rem;
font-size: 1.2rem;

`
const LabelPassword = styled.label`
margin-top: 2rem;
font-size: 1.2rem;

`

const FormContent = styled.div`

margin-top: -1rem;
display: flex;
flex-direction: column;
width: 20rem;

`

const ButtonSubmit = styled.button`
cursor: pointer;
margin-top: 2rem;
display: inline-block;
padding: .75rem 1.25rem;
border-radius: 10rem;
color: black;
text-transform: uppercase;
font-size: 1rem;
letter-spacing: .15rem;
transition: all .3s;
position: relative;
overflow: hidden;
z-index: 1;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 10rem;
    z-index: -2;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color:   black;
    transition: all .3s;
    border-radius: 10rem;
    z-index: -1;
  }
  &:hover {
    color: whitesmoke;
    &:before {
      width: 100%;
    }
  }

`
const Tittle = styled.h1`
    font-size: 2rem;
    text-align: center;
    
`
const Input = styled.input`

margin-top: 10px;
height: 2rem;
border-radius: 10px;
width: 20rem;

`
const Message = styled.p`

margin-top: 1.5rem;
text-align: center;
font-size: 1.3rem;


`

class FormNewUser extends Component {
    
    state = {
        username: "",
        password: "",
        msg: ""
    }
    
    colorMessage = () => {
        if(this.state.msg === 'Usu??rio criado com sucesso'){
            
            return "green"

        }
        else{

             return "red"
        }

    }


    handleUsername = (e) => {
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

        const usernames = await api.getUsers()
        const checkExistUsername = usernames.data.find((e) => e.username === this.state.username)



        try {
            api.signup(payload)

            this.setState({
                msg: 'Usu??rio criado com sucesso',
            })

            if (this.state.username.length <= 3) {
                this.setState({
                    msg: 'Usu??rio deve conter pelo menos 4 d??gitos',
                })
            }
            if (this.state.password.length !== 6) {
                this.setState({
                    msg: 'A senha precisa ter 6 d??gitos',
                })
            }
            if (checkExistUsername) {
                this.setState({
                    msg: 'Usu??rio j?? existente',
                })
            }


        } catch (error) {

        }
        setTimeout(()=>{this.setState({
            msg:""
        })},1500)

    }

    render() {
        return (
            <Container>
                <FormUser>
                    <Tittle>Novo Usu??rio</Tittle>
                    <FormContent>
                        <LabelUsername>Nome do usu??rio</LabelUsername>
                        <Input type="text" value={this.state.username} name="username" onChange={this.handleUsername}></Input>
                        <LabelPassword>Senha</LabelPassword>
                        <Input type="password" value={this.state.password} name="password" onChange={this.handleUsername}></Input>
                        <ButtonSubmit type="submit" onClick={this.handleSubmit}>Enviar</ButtonSubmit>
                        <Message style = {{color : this.colorMessage()}}>{this.state.msg}</Message>
                    </FormContent>
                </FormUser>
            </Container>
        )
    }
}

export default FormNewUser
