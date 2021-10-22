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
border: 3px solid black;
background-color: #574F43;

`

class FechamentoTotal extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <ContainerGeral>
                    <ContainerFundo>

                        <h1> data: 
  valor_total_vendas_do_mes: Number,
  salarios_colaboradores: Number,
  aluguel: Number,
  valor_total_compras_do_mes: Number,
 
  despesas_gerais_valor: Number,
  despesas_totais: Number,
  resultado: Number,
  user:
</h1>

                    </ContainerFundo>
                </ContainerGeral>
            </div>
        )
    }
}

export default FechamentoTotal
