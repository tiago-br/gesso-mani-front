import React, { Component } from 'react'
import Navbar from '../../components/privado/navbar/Navbar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Container = styled.div`

height: 40rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
`
const Card = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 4rem;
width: 50vw;
border: 3px solid black;
background-color: #1D1D1C;
color: white;
`

export class ServiçosPage extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Container>

                    <Link to='/sistema/faturamento'><Card> <h2>Faturamento</h2>  </Card></Link>
                    <Link to='/sistema/fechamento'><Card> <h2>Fechamento</h2> </Card></Link>
                    <Link to='/sistema/despesas'> <Card> <h2>Despesas</h2>  </Card></Link>
                    <Link to='/sistema/colaboradores'> <Card> <h2>Colaboradores</h2> </Card></Link>
                    <Link to='/sistema/sistema'> <Card> <h2>Sistema</h2> </Card></Link>


                </Container>
            </>
        )
    }
}

export default ServiçosPage
