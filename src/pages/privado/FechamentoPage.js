import React, { Component } from 'react'
import styled from 'styled-components'
import FechamentoForm from '../../components/privado/fechamento/FechamentoForm'
import FechamentoResultado from '../../components/privado/fechamento/FechamentoResultado'
import NavbarUser from '../../components/privado/navbar/Navbar'

const Container = styled.div`

width: 97vw;
min-height: 100vh;
height: 100%;
display: flex;
align-items: center;
flex-direction: column;

`

const Tittle = styled.div`
margin-top: 2rem;
`

const ContainerButtons = styled.div`
margin-top: 2rem;
display: flex;
justify-content: space-around;
width: 70vw;
@media (max-width: 960px) {  
    width: 100%;
    
    
}

`

const Button = styled.button`

width: 15rem;
height: 3rem;
color: white;
background-color: #1d1d1c;
cursor: pointer;
border: 3px solid black;

:hover{
    background-color: #727165 ;
    color: black;
}
@media (max-width: 960px) {  
    
    width: 40vw;
    
    }

`




class FechamentoPage extends Component {
    state = {
        fechamentoOn: false,
        load: false
    }
    componentDidMount = async () => {

        this.setState({
            load: true
        })
    }
    handleFechamentoOn = (msg) => {
        if (msg === "sim") {
            this.setState({
                fechamentoOn: true
            })
        }
        if (msg === "nao") {
            this.setState({
                fechamentoOn: false
            })
        }
    }
    render() {
        return (<>
            <NavbarUser />
            <Container>
                {this.state.load ?
                    <>
                        <Tittle>
                            <h1>Fechamento</h1>
                        </Tittle>

                        <ContainerButtons>
                            
                                <Button onClick={() => { this.handleFechamentoOn("sim") }}>Fechamento</Button>
                            
                            
                                <Button onClick={() => { this.handleFechamentoOn("nao") }}>Resultado</Button>
                            
                        </ContainerButtons>

                        <div>
                        
                            {this.state.fechamentoOn ?
                                <FechamentoForm />
                                :
                                <FechamentoResultado />
                            }
                        </div>
                    </>

                    :
                    <h1>Carregando...</h1>
                }
            </Container>
        </>
        )
    }
}

export default FechamentoPage
