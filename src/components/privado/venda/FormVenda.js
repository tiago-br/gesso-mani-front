

import styled from 'styled-components'
import React, { Component } from 'react'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;


`
const Input =  styled.input`

display: flex;
text-align: center;
background-color: #1D1D1C;
color: white;
border: 3px solid black;
border-radius: 10px;
cursor: pointer;
margin-top: 2rem;
padding-left: 10px;
font-size: 0.9rem;


:focus{
  outline: none;
  background-color: white;
  color: black;
  cursor: text;
 
}

`
const InputName =  styled.input`

margin-top: 2rem;

background-color: #1D1D1C;
color: white;
border-radius: 10px;
border: 3px solid black;
padding-left: 7px;
:focus{
  outline: none;
  background-color: white;
  color: black;
  cursor: text;
 
}

`

class FormVenda extends Component {

    state = {
        name: "",
        data: ""
       
     }

     componentDidMount = async () => {
        let data = new Date()

        let dia = data.getDate()

        let mes = data.getMonth() + 1

        let ano = data.getFullYear()

      await this.setState({
           data : `${ano}-${mes}-${dia}`
       })

       await this.props.infoVenda(this.state)

     }
   
    
    handleChange = async (ev) => {

        const {name,value} = ev.target

        await this.setState({
            [name] : value
        })

        await this.props.infoVenda(this.state)

       
    }

  
  
   
    render() {
        return (
            <Container>        
              <Input 
              placeholder = "data"
               name = "data"
              type="date"
              onChange={this.handleChange}
              value = {this.state.data}
              />
            <InputName 
            name = "name"
            type="text"
            placeholder = "Nome do Cliente"
            onChange={this.handleChange}
            value = {this.state.name}
            />
            
            </Container>
        )
    }
}

export default FormVenda

 

