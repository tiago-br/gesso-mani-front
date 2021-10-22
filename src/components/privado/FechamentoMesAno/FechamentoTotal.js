import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import styled from 'styled-components'

const ContainerGeral = styled.div`
width: 100vw;
display: flex;
justify-content: center;
align-items: center;

`
const ContainerFundo = styled.div`
margin-top: 3rem;
height: 30rem;
width: 80vw;
border: 3px solid red;


`

class FechamentoTotal extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <ContainerGeral>
                    <ContainerFundo>

                    </ContainerFundo>
                </ContainerGeral>
            </div>
        )
    }
}

export default FechamentoTotal
