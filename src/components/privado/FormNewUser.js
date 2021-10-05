import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import api from '../../utils/api.util'
require('dotenv').config()

const Container = styled.div`

width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
margin-top: -12vh;
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
 height: 30rem;
 border-radius: 25px;
 margin-top: 3rem;
 background-color: grey;
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
        if(this.state.msg === 'Usuário criado com sucesso'){
            
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


        // const payload = {
        //     username: this.state.username,
        //     password: this.state.password
        // }

        // const usernames = await api.getUsers()
        // const checkExistUsername = usernames.data.find((e) => e.username === this.state.username)



        // try {
        //     api.signup(payload)

        //     this.setState({
        //         msg: 'Usuário criado com sucesso',
        //     })

        //     if (this.state.username.length <= 3) {
        //         this.setState({
        //             msg: 'Usuário deve conter pelo menos 4 dígitos',
        //         })
        //     }
        //     if (this.state.password.length !== 6) {
        //         this.setState({
        //             msg: 'A senha precisa ter 6 dígitos',
        //         })
        //     }
        //     if (checkExistUsername) {
        //         this.setState({
        //             msg: 'Usuário já existente',
        //         })
        //     }


        // } catch (error) {


        // }

        e.preventDefault()
       
        const p = {
                vendedor: "Gusta",
                cliente:"tiago",
                produtos: [{
                    nome: "gessoooAo",
                    quantidade: 10,
                    valorUnitário: 25
                    },  {nome: "chavedefenda",
                    quantidade: 10,
                    valorUnitário: 250000
                    }],
                data:"dia 21",
                valor_total: 1000           
        }
         const a = {
            name:"NOVO",
            quantidade_em_estoque:5,
            valor_de_venda:200,
            descricao:"uma placa realmente bonita",
            img_Url:"algumaimagem",
            modificado_por:"gustavo"
      }
    //   const {data} = await api.getProduto()
    //   const ap = data[0]._id
    //   await api.putProduto(ap,a)
     const ll = await api.getVendas()
     console.log(ll)
        


    }

    render() {
        return (
            <Container>
                <FormUser>
                    <Tittle>Novo Usuário</Tittle>
                    <FormContent>
                        <LabelUsername>Username</LabelUsername>
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
