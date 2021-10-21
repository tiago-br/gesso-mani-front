import React, { Component } from 'react'
import styled from 'styled-components'
import { MdOutlineAddCircle } from 'react-icons/md'

const Section = styled.section`
margin-top: 1rem;

display: flex;
justify-content: space-around;
margin-bottom: 2.5rem;

h4{
    width: 18vw;
    text-align: center;
    
}
h2{
    width: 18vw;
    text-align: center;
    font-size: 2rem;
    padding-top: 7px;
}

`
const Card = styled.div`
width: 85vw;
display: flex;
align-items: center;
border: 3px solid black;
border-radius: 20px;
height: 3rem;
background-color: #1D1D1C;
color: white;

`
const Input = styled.input`
width: 10vw;
text-align: center;

`
const ContainerInput = styled.div`
text-align: center;
width: 18vw;


`

class CardEstoque extends Component {
    
    
    state = {
        name: this.props.name,
        valor_de_compra: this.props.valor_de_compra,
        quantidade : this.props.quantidade_em_estoque,
        qtd: "",
        valor_de_venda: this.props.valor_de_venda,
        boolean : false
    }

    enviarCard = () => {
        
        if(this.state.qtd === ""){
            this.setState({
                boolean: false
            })
            return alert('acresente uma quantidade')
        }

        this.setState({
            boolean : false
        })
        

        const payload = {
            name : this.state.name,
            valor_de_compra : parseInt(this.state.valor_de_compra),
            quantidade : parseInt(this.state.qtd),
            valor_de_venda : parseInt(this.state.valor_de_venda)
        }
       
        this.props.buscarCardsDoEstoque(payload)

        this.setState({
            qtd: ""
        })

    }

    alterarLista = async () => {

        await this.setState({
            boolean : true
        })
    }

    handleChange = async (e) => {

        let {name,value} = e.target
       await this.setState({
            [name]: value
        })

    } 

    render() {
        return (
            <Section>
                <Card>
                    <h4>{this.state.name}</h4>
                    {this.state.boolean ?<ContainerInput><Input name='valor_de_compra' value ={this.state.valor_de_compra} type = 'number' onChange={this.handleChange}/></ContainerInput> :<h4>{this.state.valor_de_compra}</h4> }
                    {this.state.boolean ? <ContainerInput><Input name='qtd' value ={this.state.qtd} type = 'number' onChange={this.handleChange}/></ContainerInput> : <h4>{this.state.quantidade}</h4> }
                    {this.state.boolean ? <ContainerInput><Input name='valor_de_venda' value ={this.state.valor_de_venda} type = 'number' onChange={this.handleChange}/></ContainerInput> : <h4>{this.state.valor_de_venda}</h4> }
                    {this.state.boolean ? <h2 style={{color: "green"}} onClick={this.enviarCard}><MdOutlineAddCircle /></h2> : <h2 onClick={this.alterarLista}><MdOutlineAddCircle /></h2> }
                </Card>
            </Section>
        )
    }
}

export default CardEstoque
