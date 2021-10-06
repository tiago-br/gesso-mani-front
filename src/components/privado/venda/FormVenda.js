

import styled from 'styled-components'
import React, { Component } from 'react'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;


`
const Input =  styled.input`

margin-top: 2rem;
width: 20rem;

`

class FormVenda extends Component {

    state = {
        name: "",
        data: ""
       
     }
   
    
    handleChange = (ev) => {

        const {name,value} = ev.target
        this.setState({
            [name] : value
        })


    }
  
   
    render() {
        
        return (
            <Container>        
            <Input 
            name = "name"
            type="text"
            placeholder = "Nome do Cliente"
            onChange={this.handleChange}
            value = {this.state.name}
            />
            
            <Input 
            placeholder = "data"
             name = "data"
            type="date"
            onChange={this.handleChange}
            value = {this.state.data}
            />
            </Container>
        )
    }
}

export default FormVenda

 

