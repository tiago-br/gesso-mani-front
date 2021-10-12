import React, { Component } from 'react'
import NavbarUser from '../../components/privado/NavbarUser'
import CardOrçamento from '../../components/privado/orçamento/CardOrçamento'
import api from '../../utils/api.util'
import styled from 'styled-components'

const Bt = styled.button`

width: 15rem;
height: 3rem;
background-color: grey;

`
const ContainerBt = styled.div`
width: 100vw;
display: flex;
justify-content: space-around;
margin-top: 2rem;

`

class Orcamento extends Component {

    state = {
        orçamentos: [],
        pendentes: [],
        boolean: true
    }

    componentDidMount = async () => {

        let { data } = await api.getOrcamento()

        let orçamento =  data.filter(e => e.status === "Orçamento")
        let Pendente = data.filter(e => e.status === "Pendente")

        this.setState({
            orçamentos: orçamento,
            pendentes: Pendente
        })
    }

    handleOrçamento = () => {

        this.setState({
            boolean: true
        })
    }

    handlePendente = () => {

        this.setState({
            boolean: false
        })
    }


    render() {
        return (
            <div>
                <NavbarUser />
                <ContainerBt>
                    <Bt onClick={this.handleOrçamento}>Orçamentos</Bt>
                    <Bt onClick={this.handlePendente}>Pendentes</Bt>
                </ContainerBt>
                {this.state.boolean ? this.state.orçamentos.map(orçamento => <CardOrçamento key={orçamento._id} {...orçamento} />)
                    :
                    this.state.pendentes.map(orçamento => <CardOrçamento key={orçamento._id} {...orçamento} />)}


            </div>
        )
    }
}

export default Orcamento
